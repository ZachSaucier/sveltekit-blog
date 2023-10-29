<script>
	import dateParser from '$lib/utilities/dateParser';
	export let posts = [];
</script>

<ul>
	{#each posts as post}
		{@const { date, date_string } = dateParser(post.date)}
		{@const path = `/blog/${post.slug}`}
		<li>
			<section>
				<header class="post_header">
					{#if post.coverImage}
						<a href={path} rel="full-article">
							<img
								src={post.coverImage}
								alt=""
								width={post.coverWidth}
								height={post.coverHeight}
								style="ratio: {post.coverWidth} / {post.coverHeight}"
							/>
						</a>
					{/if}

					<a href={path} rel="full-article">
						<h2 class="post_title">
							{post.title}
						</h2>
					</a>

					<time class="post_date" datetime={date}>{date_string}</time>
				</header>

				<article>
					{@html post.excerpt}
				</article>

				{#if !post.has_excerpt}
					<footer>
						<a href={path} class="read_on" rel="full-article">Read on</a>
					</footer>
				{/if}
			</section>
		</li>
	{/each}
</ul>

<style>
	section {
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAABCAYAAACsXeyTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQIHWNIS0sr/v//PwMMDzY+ADqMahlW4J91AAAAAElFTkSuQmCC)
			bottom left repeat-x;
	}

	a {
		color: inherit;
	}

	footer {
		margin-top: 1em;
	}

	.read_on {
		background-color: var(--button-dark-background);
		display: inline-block;
		padding: 0.4em 0.8em;
		margin-right: 0.5em;
		text-decoration: none;
		color: var(--background-color);
		transition: 0.15s;

		&:hover {
			background-color: var(--link-color-hover);
		}

		&::after {
			content: '\2192';
			display: inline-block;
			transform: translateX(4px);
			transition: 0.15s;
		}
		&:hover::after {
			transform: translateX(6px);
		}
	}

	:global(html.dark .read_on) {
		color: var(--accent-dark);
		background-color: var(--link-color);
	}

	:global(html.dark .read_on:hover) {
		background-color: var(--link-color-hover);
	}
</style>
