<script>
	import Date from '$lib/components/Date.svelte';
	import { title_ending } from '$lib/config';
	export let data;
	const { archive_data } = data;
</script>

<svelte:head>
	<title>Archive{title_ending}</title>
</svelte:head>

<section>
	<h1 class="page_title">Archive</h1>

	<ol>
		{#each Object.entries(archive_data) as [year, year_array]}
			<li value={year}>
				{#each year_array as post_data}
					{@const path = `/blog/${post_data.slug}`}
					<article>
						<h1><a href={path}>{post_data.title}</a></h1>
						<Date input_date={post_data.date} short={true} />
						<footer>
							<span class="categories">posted in </span>
							{#each post_data.tags as tag, i}
								<a class="tag" href={`/blog/tags/${tag}/`}>{tag}</a>
								{#if i !== post_data.tags.length - 1},{/if}
							{/each}
						</footer>
					</article>
				{/each}
			</li>
		{/each}
	</ol>
</section>
