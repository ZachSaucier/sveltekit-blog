import { redirect } from '@sveltejs/kit';
import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const load = async ({ url, params, fetch }) => {
	const page = parseInt(params.page) || 1;
	const { category } = params;

	// Prevents duplication of page 1 as the index page
	if (page <= 1) {
		throw redirect(301, `/blog/category/${category}`);
	}

	let offset = page * posts_per_page - posts_per_page;

	const total_postsRes = await fetch(`${url.origin}/blog/api/posts/count`);
	const total = await total_postsRes.json();
	const { posts } = await fetchPosts({ offset, page });

	return {
		posts,
		page,
		category,
		total_posts: total
	};
};
