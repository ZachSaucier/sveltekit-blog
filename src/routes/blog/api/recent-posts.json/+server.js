import fetchRecentPosts from '$lib/utilities/fetchRecentPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
  const { posts } = await fetchRecentPosts();
  return json(posts);
};
