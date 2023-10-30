import { error } from '@sveltejs/kit';

export const prerender = true;

// Allows client side routing. Necessary for page transitions and link prefetching; change to false if you prefer ordinary routing without JS
export const csr = true;

export const load = async ({ url }) => {
	const recent_posts_res = await fetch(`${url.origin}/blog/api/recent-posts.json`);
	const recent_posts = await recent_posts_res.json();

	try {
		return {
			path: url.pathname,
			recent_posts: recent_posts
		};
	} catch (err) {
		throw error(500, {
			message: 'Internal server error'
		});
	}
};
