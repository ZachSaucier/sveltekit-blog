import { error } from '@sveltejs/kit';

export const prerender = true;

// Allows client side routing. Necessary for page transitions and link prefetching; change to false if you prefer ordinary routing without JS
export const csr = true;

export const load = async ({ url }) => {
	const recentPostsRes = await fetch(`${url.origin}/blog/api/recent-posts.json`);
	const recentPosts = await recentPostsRes.json();

	try {
		return {
			path: url.pathname,
			recentPosts: recentPosts
		};
	} catch (err) {
		throw error(500, {
			message: 'Internal server error'
		});
	}
};
