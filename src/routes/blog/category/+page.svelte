<script>
	export let data;
	const { uniqueCategories } = data;
</script>

<svelte:head>
	<title>Blog | Categories</title>
</svelte:head>

<section>
	<h1 class="category_title">All blog categories</h1>

	<ul>
		{#each uniqueCategories as category}
			<li>
				<a href="/blog/category/{category.title}">
					{category.title}
				</a>
				({category.count})
			</li>
		{/each}
	</ul>
</section>
