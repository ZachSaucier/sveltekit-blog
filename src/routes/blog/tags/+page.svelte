<script>
	import { title_ending } from '$lib/config';
	export let data;
	const { unique_tags } = data;
</script>

<svelte:head>
	<title>Tags{title_ending}</title>
</svelte:head>

<section>
	<h1 class="page_title">All blog tags</h1>

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
