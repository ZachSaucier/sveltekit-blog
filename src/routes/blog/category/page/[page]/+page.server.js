import { redirect } from '@sveltejs/kit';
import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const load = async ({ fetch, params }) => {
	const page = parseInt(params.page) || 1;

	// Keeps from duplicationg the blog index route as page 1
	if (page <= 1) {
		throw redirect(301, '/blog');
	}

	let offset = page * posts_per_page - posts_per_page;

	const totalPostsRes = await fetch('/blog/api/posts/count');
	const total = await totalPostsRes.json();
	const { posts } = await fetchPosts({ offset, page });

	return {
		posts,
		page,
		totalPosts: total
	};
};
