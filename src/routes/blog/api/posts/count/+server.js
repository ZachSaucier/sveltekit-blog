import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      return {
        draft: metadata.draft,
      };
    })
  );

  posts = posts.filter((post) => !post.draft);

  return json(Object.keys(posts).length);
};
