import { json } from '@sveltejs/kit';
import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const prerender = true;

export const GET = async () => {
  const { posts } = await fetchPosts({ limit: posts_per_page });
  return json(posts);
};
