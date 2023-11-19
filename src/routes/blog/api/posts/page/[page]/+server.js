import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
  const { page } = params || 1;

  const options = {
    offset: (page - 1) * posts_per_page,
    limit: posts_per_page,
  };

  const { posts } = await fetchPosts(options);

  return json(posts);
};
