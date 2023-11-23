const fetchTags = async () => {
  let posts = await Promise.all(
    Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const path_pieces = path.split('/');
      // const year = path_pieces[4];
      const slug = `/blog/${path_pieces.pop().slice(0, -3)}`;
      return { ...metadata, slug };
    })
  );

  posts = posts.filter((post) => !post.draft);

  let unique_tags = {};

  posts.forEach((post) => {
    post.tags = post.tags || [];
    post.tags.forEach((tag) => {
      if (Object.prototype.hasOwnProperty.call(unique_tags, tag)) {
        unique_tags[tag].count += 1;
      } else {
        unique_tags[tag] = {
          title: tag,
          count: 1,
        };
      }
    });
  });

  const sorted_unique_tags = Object.values(unique_tags).sort((a, b) => {
    return a.count === b.count ? a.title.localeCompare(b.title) : a.count > b.count ? -1 : 1;
  });

  return sorted_unique_tags;
};

export default fetchTags;
