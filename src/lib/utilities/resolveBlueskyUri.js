const BSKY_POST_URL =
  /^https?:\/\/(?:www\.)?bsky\.app\/profile\/([^/]+)\/post\/([A-Za-z0-9]+)\/?(?:\?.*)?$/i;

/** @type {Map<string, string>} */
const didCache = new Map();

/**
 * Resolve a Bluesky web URL to an AT-URI at build/load time.
 * Already-`at://` values pass through. On failure, returns the original input
 * so the client web component can still resolve via `post=`.
 *
 * @param {string | null | undefined} value
 * @returns {Promise<string | null>}
 */
export async function resolveBlueskyUri(value) {
  if (!value || typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('at://')) return trimmed;

  const match = trimmed.match(BSKY_POST_URL);
  if (!match) return trimmed;

  const handle = decodeURIComponent(match[1]);
  const rkey = match[2];

  try {
    const did = await resolveHandle(handle);
    return `at://${did}/app.bsky.feed.post/${rkey}`;
  } catch (error) {
    console.warn(`[bluesky] Failed to resolve handle "${handle}"; using web URL.`, error);
    return trimmed;
  }
}

/**
 * @param {string} handle
 * @returns {Promise<string>}
 */
async function resolveHandle(handle) {
  const cached = didCache.get(handle);
  if (cached) return cached;

  const url = new URL('https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle');
  url.searchParams.set('handle', handle);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`resolveHandle failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data?.did || typeof data.did !== 'string') {
    throw new Error('resolveHandle response missing did');
  }

  didCache.set(handle, data.did);
  return data.did;
}
