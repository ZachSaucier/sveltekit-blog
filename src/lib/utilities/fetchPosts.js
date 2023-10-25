import { postsPerPage } from '$lib/config';

const SEPARATOR = '<span class="excerpt-marker"></span>';

let first = true;
const fetchPosts = async ({ offset = 0, limit = postsPerPage, category = '' } = {}) => {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/posts/**/*.md')).map(async ([path, resolver]) => {
			const { metadata, ...rest } = await resolver();
			const slug = path.split('/').pop().slice(0, -3);
			const html = rest.default.render().html;
			if (first) {
				first = false;
				console.log({ html });
			}
			const excerpt = html.indexOf(SEPARATOR) >= 0 ? html.split(SEPARATOR)[0] : html;
			return { ...metadata, slug, excerpt };
		})
	);

	let sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	if (category) {
		sortedPosts = sortedPosts.filter((post) => post.categories.includes(category));
	}

	if (offset) {
		sortedPosts = sortedPosts.slice(offset);
	}

	if (limit && limit < sortedPosts.length && limit != -1) {
		sortedPosts = sortedPosts.slice(0, limit);
	}

	sortedPosts = sortedPosts.map((post) => ({
		title: post.title,
		slug: post.slug,
		description: post.description,
		excerpt: post.excerpt,
		coverImage: post.coverImage,
		coverWidth: post.coverWidth,
		coverHeight: post.coverHeight,
		date: post.date,
		categories: post.categories
	}));

	return {
		posts: sortedPosts
	};
};

export default fetchPosts;
