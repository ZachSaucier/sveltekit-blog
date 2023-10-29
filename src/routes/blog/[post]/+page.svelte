<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	import dateParser from '$lib/utilities/dateParser';
	import { title_ending } from '$lib/config';
	export let data;

	const {
		title,
		description,
		date: input_date,
		updated,
		coverImage,
		coverWidth,
		coverHeight,
		categories
	} = data.meta;
	const { PostContent } = data;

	const { date, date_string } = dateParser(input_date);
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}{title_ending}</title>
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
	<header class="post_header">
		{#if coverImage}
			<img
				src={coverImage}
				alt=""
				width={coverWidth}
				height={coverHeight}
				style="ratio: {coverWidth} / {coverHeight}"
			/>
		{/if}

		<h2 class="post_title">
			{title}
		</h2>

		<time class="post_date" datetime={date}>
			{date_string}{#if updated} updated at {updated}{/if}
		</time>
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
