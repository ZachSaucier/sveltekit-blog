import { error } from '@sveltejs/kit';
import { start_year } from '$lib/config';

export const load = async ({ params }) => {
  // This searches through the directories of posts, looking for a file that matches the slug, regardless of the year
  const modules = import.meta.glob('/src/lib/posts/**/*.md');
  let year = start_year;
  const current_year = new Date().getFullYear();
  while (year <= current_year) {
    try {
      const match = modules[`/src/lib/posts/${year}/${params.post}.md`];
      const post = await match();
      return {
        PostContent: post.default,
        meta: { ...post.metadata, slug: `${year}/${params.post}` },
      };
    } catch (err) {
      // it's fine, try the next year
    }
    year++;
  }

  throw error(404, {
    message: 'Article not found',
  });
};
