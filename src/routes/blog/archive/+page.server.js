import { start_year } from '$lib/config';

export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/blog/api/posts.json`);
	let posts = await res.json();

	const current_year = new Date().getFullYear();
	const years = new Array(current_year - start_year + 1).fill().map((_, i) => current_year - i);
	const archive_data = {};
	for (const year of years) {
		archive_data[year] = [];
	}

	posts.forEach((post) => {
		const year = parseInt(post.date.split('-')[0]);
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
