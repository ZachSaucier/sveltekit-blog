<!-- Renders posts listed by category -->
<script>
	import { site_description } from '$lib/config';
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
	const { page, totalPosts, posts } = data;

	$: lowerBound = page * posts_per_page - (posts_per_page - 1) || 1;
	$: upperBound = Math.min(page * posts_per_page, totalPosts);
</script>

<svelte:head>
	<title>Blog category - page {page}</title>
	<meta data-key="description" name={site_description} />
</svelte:head>

<!-- TODO: this is duplicated across multiple `+page.svelte` files -->
{#if posts.length}
	<h1>Posts {lowerBound}–{upperBound} of {totalPosts}</h1>
	<Pagination currentPage={page} {totalPosts} />

	<PostsList {posts} />

	<Pagination currentPage={page} {totalPosts} />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
