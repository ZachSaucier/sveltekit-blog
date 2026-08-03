import { atproto_publication_uri } from '$lib/atproto.js';

export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export const GET = () => {
  if (!atproto_publication_uri) {
    return new Response('Publication not configured', { status: 404 });
  }

  return new Response(atproto_publication_uri, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
