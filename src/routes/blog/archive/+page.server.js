export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/blog/api/posts_for_tags.json`);
	let posts = await res.json();

	const archive_data = {};

	posts.forEach((post) => {
		const year = parseInt(post.date.split('-')[0]);
		if (!archive_data[year]) archive_data[year] = [];
		archive_data[year].push({
			title: post.title,
			slug: post.slug,
			date: post.date,
			tags: post.tags
		});
	});

	return {
		archive_data
	};
};
