# A Svelte 5 / Sveltekit blog by Zach Saucier

## [Demo](https://zachsaucier.com/blog/)

## Support

Did you find this repo useful? I'd really appreciate it if you would consider buying me a coffee!

<a href="https://www.buymeacoffee.com/zachsaucier" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## Features

- **It lives under `/blog`** instead of the top level so you can keep your main website separate.
- **Static site generation with hydration.** Every route is compiled down to static HTML and routed with (optional) JavaScript, thanks to the SvelteKit static adapter.
- **Markdown support** with GitHub Flavored Markdown (GFM).
- **Styles per component** along with a single global stylesheet for general styles (mostly article content styles). With CSS variables and CSS nesting, there's no need for SASS!
- **mdvsex support** so you can use Svelte components in your Markdown files!
- **Automatic page transitions.**
- **Responsive and accessible defaults** including a "skip to content" link, accessible navigation and components, and accessible emojis.
- **SEO** for blog posts.
- **Related posts functionality** which makes use of your tags to link to similar posts in your blog.
- **RSS feed** for users to easily subscribe to new posts.
- **AT Protocol (Standard.site) sync** so blog posts are published as records on your PDS for discovery on Bluesky and other AT apps. See [AT Protocol sync](#at-protocol-sync) below.
- **Draft blog post functionality** so you can save to the same place but not have the link show up in your listings or counts.
- **Footnotes functionality**
- **Blog excerpt functionality** so that you can show the start of your blog posts on the blog homepage instead of the description.
- **Tags (categories) functionality** which make looking for specific types of posts easy.
- **Advanced pagination** where only the nearest 5 pages are shown along with "first" and "last" page buttons when applicable.
- **Support for year sub-directories within posts.** This makes organizing your posts much more pleasant. You could easily add the year to the URL if you'd like.
- **Recent posts functionality** if you want to show the last N recent posts.
- **Archive functionality** which is similar to the blog listing but only shows the title and tags with a different layout that focuses on the year it was published. [Demo](https://zachsaucier.com/blog/archive/).
- **Light and dark mode support**.
- **Collapsible sidebar**.
- **Tweet and CodePen embeds**.
- **Image lightboxing functionality** with built in image serving for high DPI devices.
- **High quality search functionality** using [Pagefind](https://pagefind.app/).
- **Clickable section headings** to make sharing to a particular part of a post a breeze.
- **Table of contents for blog posts** that outlines the sections of each page.
- **"Share to Bluesky" button**. There's also an X (Twitter) one commented out.
- **Automatic widow prevention** to make your blocks of text look better.
- **Email signup functionality.** It makes use of Mailchimp, but you could easily switch out the email provider for another of your choice.

## Getting started

I recommend forking this repo and then cloning it from there so that your changes are independent of the ones I will make in the future.

Use `npm run dev` to get it running locally.

In order to get the search functionality working locally, you must build the project using `npm run build`. If you want the search content to update, you need to rebuild the project.

## AT Protocol sync

This blog can sync posts to [AT Protocol](https://atproto.com/) using the [Standard.site](https://standard.site/) lexicons. The sync script pushes metadata and a markdown copy of each post to your Personal Data Server (PDS). It does not create Bluesky timeline posts — followers still land on your website when they click a link.

### Setup

1. Create an [app password](https://bsky.app/settings/app-passwords) for your Bluesky account.
2. Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

`.env` is purposefully gitignored. It should contain:

```
ATPROTO_HANDLE=your-handle.bsky.social
ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

3. Run a dry run to preview what will sync:

```bash
npm run sync:atproto -- --dry-run
```

### Syncing posts

Create the publication record and sync all non-draft posts:

```bash
npm run sync:atproto -- --create-publication
```

On later runs, sync before you build:

```bash
npm run sync:atproto
```

This writes records to your PDS and saves AT-URIs to `src/lib/atproto-manifest.json`. **Commit that file** after syncing — the build uses it to add Standard.site verification link tags to your post pages.

### Root `.well-known` (manual, first sync only)

If your blog lives under a subpath (e.g. `/blog`) but your domain root is hosted separately, add a plain-text file at:

```
https://yourdomain.com/.well-known/site.standard.publication
```

The file contents should be the `publicationUri` value from `src/lib/atproto-manifest.json` (one line, the full `at://…` URI). This goes on the root site, not in the `build/` folder.

### What sync does and does not do

- **Does:** Creates/updates `site.standard.publication` and `site.standard.document` records on your PDS over the network. No separate file upload to AT Protocol is needed.
- **Does:** Strip `<script>` blocks from the markdown stored on AT Protocol (Svelte component imports are not supported there).
- **Does not:** Replace your website. Canonical URLs still point to your static site, where full post content and embedded components work as normal.
- **Does not:** Automatically post to your Bluesky profile. Share links manually if you want them in followers' timelines.

## Publishing

If you use [AT Protocol sync](#at-protocol-sync), run `npm run sync:atproto` before `npm run build` and commit any changes to `src/lib/atproto-manifest.json`.

Then build the site:

```
npm run build
```

Then put the `build/` files where you want them on your server (unless you have this repo configured to deploy automatically).

## Documentation

Good sources for docs are:

- [The Sveltekit blog starter kit README](https://github.com/josh-collinsworth/sveltekit-blog-starter) that this project was originally forked from.
- [The Sveltekit docs](https://kit.svelte.dev/docs)

## Getting help

You're free to create an issue on this repo and if I have the time I am likely to respond. But no promises!
