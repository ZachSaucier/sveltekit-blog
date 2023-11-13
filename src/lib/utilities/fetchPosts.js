import { posts_per_page } from '$lib/config';

export const prerender = true;

const SEPARATOR = '<span class="excerpt_marker"></span>';

const fetchPosts = async ({ offset = 0, limit = posts_per_page, tag = '' } = {}) => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
      const { metadata, ...rest } = await resolver();
      const path_pieces = path.split('/');
      // const year = path_pieces[4];
      const slug = path_pieces.pop().slice(0, -3);
      const html = rest.default.render().html;
      const has_excerpt = html.indexOf(SEPARATOR) === -1;
      const excerpt = has_excerpt ? html : html.split(SEPARATOR)[0];
      return { ...metadata, slug, excerpt, has_excerpt };
    })
  );

  posts = posts.filter((post) => !post.draft);

  let sorted_posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (tag) {
    sorted_posts = sorted_posts.filter((post) => post.tags.includes(tag));
  }

  if (offset) {
    sorted_posts = sorted_posts.slice(offset);
  }

  if (limit && limit < sorted_posts.length && limit != -1) {
    sorted_posts = sorted_posts.slice(0, limit);
  }

  sorted_posts = sorted_posts.filter(Boolean);

  sorted_posts = sorted_posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    excerpt: post.excerpt,
    has_excerpt: post.has_excerpt,
    cover_image: post.cover_image,
    cover_width: post.cover_width,
    cover_height: post.cover_height,
    date: post.date,
    tags: post.tags,
  }));

  return {
    posts: sorted_posts,
  };
};

export default fetchPosts;
