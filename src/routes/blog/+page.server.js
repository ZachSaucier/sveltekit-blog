export const load = async ({ url, fetch }) => {
  const post_res = await fetch(`${url.origin}/blog/api/posts.json`);
  const posts = await post_res.json();

  const total_res = await fetch(`${url.origin}/blog/api/posts/count`);
  const total_posts = await total_res.json();

  return { posts, total_posts };
};
