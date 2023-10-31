<script>
	import { title_ending } from '$lib/config';
	import PageTitle from '$lib/components/PageTitle.svelte';
	export let data;
	const { unique_tags } = data;
</script>

<svelte:head>
	<title>All tags{title_ending}</title>
</svelte:head>

<section>
	<PageTitle title="All tags" />

	<ol>
		{#each unique_tags as tag}
			<li>
				<a href="/blog/tag/{tag.title}">
					{tag.title}
				</a>
				({tag.count})
			</li>
		{/each}
	</ol>
</section>
