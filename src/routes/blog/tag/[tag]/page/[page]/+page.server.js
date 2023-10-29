import { redirect } from '@sveltejs/kit';
import { posts_per_page } from '$lib/config';
import fetchPosts from '$lib/utilities/fetchPosts';

export const load = async ({ params }) => {
	const page = parseInt(params.page) || 1;
	const { tag } = params;

	if (page <= 1) {
		throw redirect(301, `/blog/tag/${tag}`);
	}

	const total_posts_with_tag = (await fetchPosts({ tag, limit: -1 })).posts.length;

	const offset = page * posts_per_page - posts_per_page;
	const { posts } = await fetchPosts({ tag, offset, page });

	return {
		posts,
		page,
		tag,
		total_posts: total_posts_with_tag
	};
};
