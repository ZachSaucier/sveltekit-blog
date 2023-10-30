export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/blog/api/posts.json`);
	let posts = await res.json();

	let unique_tags = {};

	posts.forEach((post) => {
		post.tags.forEach((tag) => {
			if (Object.prototype.hasOwnProperty.call(unique_tags, tag)) {
				unique_tags[tag].count += 1;
			} else {
				unique_tags[tag] = {
					title: tag,
					count: 1
				};
			}
		});
	});

	const sorted_unique_tags = Object.values(unique_tags).sort((a, b) => {
		return a.count === b.count ? a.title.localeCompare(b.title) : a.count > b.count ? -1 : 1;
	});

	return {
		unique_tags: sorted_unique_tags
	};
};
