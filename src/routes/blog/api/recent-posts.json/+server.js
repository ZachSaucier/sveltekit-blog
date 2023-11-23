import fetchPosts from '$lib/utilities/fetchPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
  const { posts } = await fetchPosts({ limit: 3 });
  return json(posts);
};
