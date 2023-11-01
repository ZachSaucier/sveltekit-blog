<script>
	import { title_ending } from '$lib/config';
	import Section from '$lib/components/Section.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	export let data;
	const { unique_tags } = data;
</script>

<svelte:head>
	<title>All tags{title_ending}</title>
</svelte:head>

<Section>
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
</Section>
