<script>
	import Section from '$lib/components/Section.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Date from '$lib/components/Date.svelte';
	import { title_ending } from '$lib/config';
	export let data;
	const { archive_data } = data;

	const date_styles = 'left: 0; font-size: 0.9em; line-height: 1.5;';
</script>

<svelte:head>
	<title>Archive{title_ending}</title>
</svelte:head>

<Section>
	<PageTitle title="Archive" />

	<ol>
		{#each Object.entries(archive_data).reverse() as [year, year_array]}
			<li value={year}>
				{#each year_array as post_data}
					{@const path = `/blog/${post_data.slug}`}
					<article>
						<h1><a href={path}>{post_data.title}</a></h1>
						<Date input_date={post_data.date} short={true} style={date_styles} />
						<footer>
							<span class="categories">posted in </span>
							{#each post_data.tags as tag, i}
								<a class="tag" href="/blog/tags/{tag}/">{tag}</a>
								{#if i !== post_data.tags.length - 1},{/if}
							{/each}
						</footer>
					</article>
				{/each}
			</li>
		{/each}
	</ol>
</Section>

<style>
	@counter-style plain-number {
		system: extends decimal;
		suffix: ' ';
	}

	ol {
		list-style: plain-number;
		padding-inline-start: 3.7em;

		& li::marker {
			color: var(--grayed-text);
			font-family: var(--font-sans-serif);
			font-size: 1.5em;
		}
	}

	article {
		position: relative;
		padding-left: 4.5em;
		padding-bottom: 0.7em;
		background: var(--border-dashed);
	}

	a {
		color: inherit;
	}

	footer {
		color: var(--grayed-text);
	}
</style>
