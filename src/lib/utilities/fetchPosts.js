import { posts_per_page } from '$lib/config';

const SEPARATOR = '<span class="excerpt_marker"></span>';
const TOC_MATCH = new RegExp('<nav class="toc"(?:.*)>(.*)</ol></nav>');

const fetchPosts = async ({ offset = 0, limit = posts_per_page, tag } = {}) => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
      const { metadata, ...rest } = await resolver();
      const path_pieces = path.split('/');
      // const year = path_pieces[4];
      const slug = path_pieces.pop().slice(0, -3);
      const full_post = rest.default.render().html;
      let excerpt = full_post.indexOf(SEPARATOR) !== -1 ? full_post.split(SEPARATOR)[0] : null;
      // Strip table of contents from the excerpt
      const toc = excerpt && excerpt.match(TOC_MATCH);
      if (toc) {
        excerpt = excerpt.replace(toc[0], '');
      }
      return { ...metadata, slug, full_post, excerpt };
    })
  );

  posts = posts.filter((post) => !post.draft);

  let sorted_posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (tag) {
    sorted_posts = sorted_posts.filter((post) => post.tags?.includes(tag));
  }

  if (offset) {
    sorted_posts = sorted_posts.slice(offset);
  }

  if (limit && limit != -1 && limit < sorted_posts.length) {
    sorted_posts = sorted_posts.slice(0, limit);
  }

  sorted_posts = sorted_posts.filter(Boolean);

  return {
    posts: sorted_posts,
  };
};

export default fetchPosts;
