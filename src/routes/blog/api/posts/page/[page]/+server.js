import { postsPerPage } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async ({ params }) => {
	const { page } = params || 1;

	const options = {
		offset: (page - 1) * postsPerPage,
		limit: postsPerPage
	};

	const { posts } = await fetchPosts(options);

	return json(posts);
};
