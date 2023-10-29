<!-- Renders posts listed by category -->
<script>
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { site_description, posts_per_page } from '$lib/config';

	export let data;
	const { page, category, total_posts, posts } = data;

	$: lowerBound = page * posts_per_page - (posts_per_page - 1) || 1;
	$: upperBound = Math.min(page * posts_per_page, total_posts);
</script>

<svelte:head>
	<title>Blog category {category} - page {page}</title>
	<meta data-key="description" name={site_description} />
</svelte:head>

<!-- TODO: this is duplicated across multiple `+page.svelte` files -->
{#if posts && posts.length}
	<h1>
		Category: {category}
		<br />
		<small>Posts {lowerBound}–{upperBound} of {total_posts}</small>
	</h1>
	<Pagination current_page={page} {total_posts} path="/blog/category/{category}/page" />

	<PostsList {posts} />

	<Pagination current_page={page} {total_posts} path="/blog/category/{category}/page" />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
