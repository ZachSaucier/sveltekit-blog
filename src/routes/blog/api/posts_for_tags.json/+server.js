import { json } from '@sveltejs/kit';
import fetchPosts from '$lib/utilities/fetchPosts';

export const prerender = true;

export const GET = async () => {
  const { posts } = await fetchPosts({ limit: -1 });
  return json(posts);
};
