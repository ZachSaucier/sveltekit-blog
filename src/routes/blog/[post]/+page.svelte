<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	import { onMount } from 'svelte';
	import { title_ending } from '$lib/config';
	import Date from '$lib/components/Date.svelte';
	import TwitterShare from '$lib/components/TwitterShare.svelte';
	export let data;

	let url = ``;
	onMount(() => (url = window.location.href));

	const { title, description, date, updated, cover_image, cover_width, cover_height, tags } =
		data.meta;
	const { PostContent } = data;
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
	<meta property="og:image:width" content={cover_width} />
	<meta property="og:image:height" content={cover_height} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<section>
	<header class="post_header">
		{#if cover_image}
			<img
				src={cover_image}
				alt=""
				width={cover_width}
				height={cover_height}
				style="ratio: {cover_width} / {cover_height}"
			/>
		{/if}

		<h2 class="post_title">
			{title}
		</h2>

		<Date input_date={date} {updated} />
	</header>

	<article>
		<svelte:component this={PostContent} />
	</article>
</section>

{#if tags}
	<aside>
		<div class="tags">
			<h2>Tags:</h2>
			<ul>
				{#each tags as tag}
					<li>
						<a href="/blog/tag/{tag}/">
							{tag}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<TwitterShare {url} />
	</aside>
{/if}

<style>
	aside {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding: 0 var(--content-gutter) 37px;

		background: var(--border-dashed);
	}

	.tags {
		--gap: 0.6ex;
		display: flex;
		gap: var(--gap);
		align-items: center;
		font-size: 14px;

		& h2 {
			font-family: inherit;
			line-height: inherit;
		}

		& h2,
		& li {
			margin: 0;
		}

		& ul {
			display: flex;
			gap: var(--gap);
			list-style: none;
		}

		& li:not(:last-child)::after {
			content: ', ';
			margin-left: -5px;
		}
	}
</style>
