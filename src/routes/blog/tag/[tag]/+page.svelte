<script>
	import { site_description, posts_per_page, title_ending } from '$lib/config';
	import TagPostsList from '$lib/components/TagPostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
	const { page, tag, total_posts, posts } = data;

	$: lower_bound = page * posts_per_page - (posts_per_page - 1) || 1;
	$: upper_bound = Math.min(page * posts_per_page, total_posts);
</script>

<svelte:head>
	<title>Tag: {tag}{title_ending}</title>
	<meta data-key="description" name={site_description} />
</svelte:head>

{#if posts && posts.length}
	<TagPostsList {posts} {tag} {lower_bound} {upper_bound} {total_posts} />

	<Pagination current_page={page} {total_posts} path="/blog/tag/{tag}/page" />
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
