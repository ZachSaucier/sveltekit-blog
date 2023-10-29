<script>
	import { title_ending, site_description } from '$lib/config';
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
</script>

<svelte:head>
	<title>Musings{title_ending}</title>
	<meta data-key="description" name="description" content={site_description} />
</svelte:head>

<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />
