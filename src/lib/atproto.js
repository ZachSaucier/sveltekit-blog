import manifest from './atproto-manifest.json';

/** @typedef {{ did: string; collection: string; rkey: string }} AtUriParts */

/**
 * @param {string | null | undefined} uri
 * @returns {AtUriParts | null}
 */
export function parseAtUri(uri) {
  if (!uri) return null;
  const match = uri.match(/^at:\/\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (!match) return null;
  return { did: match[1], collection: match[2], rkey: match[3] };
}

/**
 * @param {string} slug
 * @returns {string | null}
 */
export function getDocumentUriForSlug(slug) {
  return manifest.documents?.[slug]?.uri ?? null;
}

export const atproto_publication_uri = manifest.publicationUri ?? null;
