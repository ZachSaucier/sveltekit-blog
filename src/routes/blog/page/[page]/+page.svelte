<script>
	import Section from '$lib/components/Section.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { posts_per_page, site_description } from '$lib/config';

	export let data;
	const { page, total_posts, posts } = data;

	$: lower_bound = page * posts_per_page - (posts_per_page - 1) || 1;
	$: upper_bound = Math.min(page * posts_per_page, total_posts);

	const path = '/blog/page';
</script>

<svelte:head>
	<title>Blog - page {page}</title>
	<meta data-key="description" name="description" content={site_description} />
</svelte:head>

{#if posts.length}
	<Section>
		<Pagination current_page={page} {path} {total_posts} {lower_bound} {upper_bound} />
	</Section>

	<PostsList {posts} />

	<Section>
		<Pagination current_page={page} {path} {total_posts} {lower_bound} {upper_bound} />
	</Section>
{:else}
	<h1>Oops!</h1>

	<p>Sorry, no posts to show here.</p>

	<a href="/blog">Back to blog</a>
{/if}
