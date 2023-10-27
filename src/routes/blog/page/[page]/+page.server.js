import { redirect } from '@sveltejs/kit';
import { postsPerPage } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const load = async ({ url, params, fetch }) => {
	const page = parseInt(params.page) || 1;

	// Keeps from duplicating the blog index route as page 1
	if (page <= 1) {
		throw redirect(301, '/blog');
	}

	let offset = page * postsPerPage - postsPerPage;

	const totalPostsRes = await fetch(`${url.origin}/blog/api/posts/count`);
	const total = await totalPostsRes.json();
	const { posts } = await fetchPosts({ offset, page });

	return {
		posts,
		page,
		totalPosts: total
	};
};
