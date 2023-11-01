<!-- Same things (except page title) as src/routes/blog/tag/[tag]/page/[page]/+page.svelte -->
<script>
	import { site_description, tags_per_page, title_ending } from '$lib/config';
	import Section from '$lib/components/Section.svelte';
	import TagPostsList from '$lib/components/TagPostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
	const { page, tag, total_posts, posts } = data;

	$: lower_bound = page * tags_per_page - (tags_per_page - 1) || 1;
	$: upper_bound = Math.min(page * tags_per_page, total_posts);

	const path = `/blog/tag/${tag}/page`;
</script>

<svelte:head>
	<title>Tag: {tag}{title_ending}</title>
	<meta data-key="description" name={site_description} />
</svelte:head>

{#if posts && posts.length}
	<TagPostsList {posts} {tag}>
		<Pagination
			is_tag_pagination={true}
			current_page={page}
			{path}
			{total_posts}
			{lower_bound}
			{upper_bound}
		/>
	</TagPostsList>

	<Section>
		<Pagination
			is_tag_pagination={true}
			current_page={page}
			{path}
			{total_posts}
			{lower_bound}
			{upper_bound}
		/>
	</Section>
{:else}
	<Section>
		<h1>Oops!</h1>

		<p>Sorry, no posts to show here.</p>

		<a href="/blog">Back to blog</a>
	</Section>
{/if}
