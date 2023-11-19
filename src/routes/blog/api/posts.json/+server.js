import { json } from '@sveltejs/kit';
import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const GET = async () => {
  const options = {
    limit: posts_per_page,
  };

  const { posts } = await fetchPosts(options);
  return json(posts);
};
