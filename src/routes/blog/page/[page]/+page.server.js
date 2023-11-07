import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, params, fetch }) => {
  const page = parseInt(params.page) || 1;

  // Keeps from duplicating the blog index route as page 1
  if (page <= 1) {
    throw redirect(301, '/blog');
  }

  const offset = page * posts_per_page - posts_per_page;

  const total_posts_res = await fetch(`${url.origin}/blog/api/posts/count`);
  const total = await total_posts_res.json();
  const { posts } = await fetchPosts({ offset, page });

  return {
    page,
    posts,
    total_posts: total,
  };
};
