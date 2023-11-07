export const prerender = true;

const fetchRecentPosts = async () => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const path_pieces = path.split('/');
      // const year = path_pieces[4];
      const slug = path_pieces.pop().slice(0, -3);
      return { ...metadata, slug };
    })
  );

  posts = posts.filter((post) => !post.draft);

  let sorted_posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  sorted_posts = sorted_posts.slice(0, 3).filter(Boolean);

  sorted_posts = sorted_posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    date: post.date,
    tags: post.tags,
  }));

  return {
    posts: sorted_posts,
  };
};

export default fetchRecentPosts;
