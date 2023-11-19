import fetchRecentPosts from '$lib/utilities/fetchRecentPosts';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  const { posts } = await fetchRecentPosts();
  return json(posts);
};
