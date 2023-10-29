<script>
	import { site_description, posts_per_page, title_ending } from '$lib/config';
	import CategoryPostsList from '$lib/components/CategoryPostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
	const { page, category, total_posts, posts } = data;

	$: lower_bound = page * posts_per_page - (posts_per_page - 1) || 1;
	$: upper_bound = Math.min(page * posts_per_page, total_posts);
</script>

<svelte:head>
	<title>Category: {category}{title_ending}</title>
	<meta data-key="description" name={site_description} />
</svelte:head>

{#if posts && posts.length}
	<CategoryPostsList {posts} {category} {lower_bound} {upper_bound} {total_posts} />

	<Pagination current_page={page} {total_posts} path="/blog/category/{category}/page" />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
