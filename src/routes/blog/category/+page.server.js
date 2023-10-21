export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/blog/api/posts.json`);
	let posts = await res.json();

	let uniqueCategories = {};

	posts.forEach((post) => {
		post.categories.forEach((category) => {
			if (uniqueCategories.hasOwnProperty(category)) {
				uniqueCategories[category].count += 1;
			} else {
				uniqueCategories[category] = {
					title: category,
					count: 1
				};
			}
		});
	});

	const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) => {
		return a.count === b.count ? a.title.localeCompare(b.title) : a.count > b.count;
	});

	return {
		uniqueCategories: sortedUniqueCategories
	};
};
