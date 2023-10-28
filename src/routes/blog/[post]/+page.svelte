<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	export let data;

	const { title, description, date, updated, coverImage, coverWidth, coverHeight, categories } =
		data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<section>
	<header>
		{#if coverImage}
			<img
				src={coverImage}
				alt=""
				style="aspect-ratio: {coverWidth} / {coverHeight};"
				width={coverWidth}
				height={coverHeight}
			/>
		{/if}

		<h1>{title}</h1>

		<div class="meta">
			<b>Published:</b>
			{date}
			<br />
			<b>Updated:</b>
			{updated}
		</div>
	</header>

	<article>
		<svelte:component this={PostContent} />
	</article>

	{#if categories}
		<aside>
			<h2>Posted in:</h2>
			<ul>
				{#each categories as category}
					-
					<a href="/blog/category/{category}/">
						{category}
					</a>
				{/each}
			</ul>
		</aside>
	{/if}
</section>
