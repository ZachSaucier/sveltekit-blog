/**
 * Sync blog posts to AT Protocol as site.standard.* records.
 *
 * Requires environment variables:
 *   ATPROTO_HANDLE       - Bluesky handle (e.g. zachsaucier.com)
 *   ATPROTO_APP_PASSWORD - App password from bsky.app/settings/app-passwords
 *
 * Optional:
 *   ATPROTO_PUBLICATION_URI - Existing publication AT-URI (skip auto-detect)
 *
 * Usage:
 *   node scripts/sync-atproto.mjs --create-publication   # one-time setup
 *   node scripts/sync-atproto.mjs                        # sync all posts
 *   node scripts/sync-atproto.mjs --dry-run              # preview without publishing
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { StandardSitePublisher } from '@ewanc26/svelte-standard-site/publisher';
import { transformContent } from '@ewanc26/svelte-standard-site/content';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** Load `.env` from the project root without overwriting existing env vars. */
function loadEnvFile() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const postsDir = path.join(root, 'src/lib/posts');
const manifestPath = path.join(root, 'src/lib/atproto-manifest.json');

const siteLink = 'https://zachsaucier.com/blog';
const publicationName = "Zach Saucier's Blog";
const publicationDescription = "Zach Saucier's personal blog";

const args = new Set(process.argv.slice(2));
const createPublication = args.has('--create-publication');
const dryRun = args.has('--dry-run');

/** @returns {Record<string, unknown>} */
function readManifest() {
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

/** @param {Record<string, unknown>} manifest */
function writeManifest(manifest) {
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

/** @param {string} body */
function stripSvelteBlocks(body) {
  return body.replace(/<script[\s\S]*?<\/script>/gi, '').trim();
}

/** @returns {Array<{ slug: string; year: string; filePath: string; metadata: Record<string, unknown>; body: string }>} */
function loadPosts() {
  /** @type {ReturnType<typeof loadPosts>} */
  const posts = [];

  for (const year of fs.readdirSync(postsDir)) {
    const yearDir = path.join(postsDir, year);
    if (!fs.statSync(yearDir).isDirectory()) continue;

    for (const file of fs.readdirSync(yearDir)) {
      if (!file.endsWith('.md')) continue;

      const filePath = path.join(yearDir, file);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data: metadata, content } = matter(source);

      if (metadata.draft) continue;

      posts.push({
        slug: file.replace(/\.md$/, ''),
        year,
        filePath,
        metadata,
        body: stripSvelteBlocks(content),
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(String(b.metadata.date)).getTime() - new Date(String(a.metadata.date)).getTime(),
  );
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const manifest = readManifest();

  if (dryRun) {
    const posts = loadPosts();
    console.log(`Would sync ${posts.length} posts to ${siteLink}`);
    if (manifest.publicationUri) {
      console.log(`Publication: ${manifest.publicationUri}`);
    } else {
      console.log('Publication: (would be created on first run)');
    }
    for (const post of posts.slice(0, 5)) {
      console.log(`  - ${post.slug} (${post.metadata.title})`);
    }
    if (posts.length > 5) console.log(`  ... and ${posts.length - 5} more`);
    return;
  }

  const handle = requireEnv('ATPROTO_HANDLE');
  const password = requireEnv('ATPROTO_APP_PASSWORD');

  const publisher = new StandardSitePublisher({
    identifier: handle,
    password,
  });

  await publisher.login();
  const did = publisher.getDid();
  console.log(`Authenticated as ${did}`);

  let publicationUri = process.env.ATPROTO_PUBLICATION_URI || manifest.publicationUri;

  if (createPublication || !publicationUri) {
    if (publicationUri && !createPublication) {
      console.log(`Using existing publication: ${publicationUri}`);
    } else {
      console.log('Creating publication record...');
      const result = await publisher.publishPublication({
        name: publicationName,
        url: siteLink,
        description: publicationDescription,
      });
      publicationUri = result.uri;
      manifest.publicationUri = publicationUri;
      writeManifest(manifest);
      console.log(`Publication created: ${publicationUri}`);
      console.log('Add this URI to your deployment config if needed.');
    }
  }

  if (!manifest.documents) manifest.documents = {};

  const posts = loadPosts();
  console.log(`Syncing ${posts.length} posts...`);

  for (const post of posts) {
    const postPath = `/${post.slug}/`;
    const transformed = transformContent(post.body, {
      baseUrl: siteLink,
      postPath,
    });

    const input = {
      site: publicationUri,
      title: String(post.metadata.title),
      description: post.metadata.description ? String(post.metadata.description) : undefined,
      publishedAt: new Date(String(post.metadata.date)).toISOString(),
      updatedAt: post.metadata.updated
        ? new Date(String(post.metadata.updated)).toISOString()
        : undefined,
      path: postPath,
      tags: Array.isArray(post.metadata.tags) ? post.metadata.tags.map(String) : undefined,
      textContent: transformed.textContent,
      content: {
        $type: 'site.standard.content.markdown',
        text: transformed.markdown,
        version: '1.0',
      },
    };

    const existing = manifest.documents[post.slug];

    if (existing?.rkey) {
      await publisher.updateDocument(existing.rkey, input);
      manifest.documents[post.slug] = {
        uri: existing.uri,
        rkey: existing.rkey,
      };
      console.log(`Updated: ${post.slug}`);
    } else {
      const result = await publisher.publishDocument(input);
      const rkey = result.uri.split('/').pop();
      manifest.documents[post.slug] = {
        uri: result.uri,
        rkey,
      };
      console.log(`Published: ${post.slug} → ${result.uri}`);
    }
  }

  writeManifest(manifest);
  console.log('Done. Manifest updated at src/lib/atproto-manifest.json');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
