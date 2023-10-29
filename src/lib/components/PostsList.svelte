<script>
	export let posts = [];
</script>

<ul>
	{#each posts as post}
		{@const date = new Date(post.date)}
		{@const dateString =
			date.getFullYear() === new Date().getFullYear()
				? date.toLocaleDateString(undefined, {
						month: 'short',
						day: 'numeric'
				  })
				: date.toLocaleDateString(undefined, {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
				  })}
		{@const path = `/blog/${post.slug}`}
		<li>
			<section>
				<header>
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
						<h2>
							{post.title}
						</h2>
					</a>
					<time datetime={post.date}>{dateString}</time>
				</header>

				<article>
					{@html post.excerpt}
				</article>

				{#if !post.has_excerpt}
					<footer>
						<a href={path} class="read-on" rel="full-article">Read on</a>
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

	header {
		position: relative;
		display: flex;
		padding-top: 36px;
		margin-bottom: 28px;
	}

	a {
		color: inherit;
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	h2 {
		font-size: 40px;
		font-weight: bold;
		text-wrap: pretty;
	}

	time {
		font-family: 'PT Sans', 'Helvetica Neue', Arial, sans-serif;
		position: absolute;
		top: 0;
		color: var(--grayed-text);
	}

	footer {
		margin-top: 1em;
	}

	.read-on {
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

	:global(html.dark .read-on) {
		color: var(--accent-dark);
		background-color: var(--link-color);
	}

	:global(html.dark .read-on:hover) {
		background-color: var(--link-color-hover);
	}
</style>
