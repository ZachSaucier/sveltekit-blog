import fetchPosts from '$lib/utilities/fetchPosts';
import { json } from '@sveltejs/kit';

export const prerender = true;

export const GET = async () => {
	const options = {
		limit: -1
	};

	const { posts } = await fetchPosts(options);
	return json(posts);
};
