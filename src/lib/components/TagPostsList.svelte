<script>
	import Section from '$lib/components/Section.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Date from '$lib/components/Date.svelte';

	export let posts = [];
	export let tag = '';
</script>

<Section no_border={true}>
	<PageTitle title="Tag: {tag}">
		<slot />
	</PageTitle>
</Section>

<ul>
	{#each posts as post}
		{@const path = `/blog/${post.slug}`}
		<li>
			<Section>
				<header class="post_header">
					<a href={path} rel="full-article">
						<h2 class="post_title">
							{post.title}
						</h2>
					</a>

					<Date input_date={post.date} />
				</header>

				<article>
					{@html post.description}
				</article>
			</Section>
		</li>
	{/each}
</ul>

<style>
	a {
		color: inherit;
	}
</style>
