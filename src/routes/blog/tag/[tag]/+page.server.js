import fetchPosts from '$lib/utilities/fetchPosts';

export const load = async ({ params }) => {
  const tag = params.tag;
  const page = params.page || 1;
  const { posts } = await fetchPosts({ tag, limit: -1 });

  return {
    posts,
    tag,
    page,
    total_posts: posts.length,
  };
};
