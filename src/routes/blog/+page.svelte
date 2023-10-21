<script>
	import { siteDescription } from '$lib/config';
	import PostsList from '$lib/components/PostsList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data;
</script>

<svelte:head>
	<title>Musings - Zach Saucier's blog</title>
	<meta data-key="description" name="description" content={siteDescription} />
</svelte:head>

<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />
