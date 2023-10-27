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
		<li>
			<article>
				{#if post.coverImage}
					<a href="/blog/{post.slug}" rel="full-article">
						<img
							src={post.coverImage}
							alt=""
							width={post.coverWidth}
							height={post.coverHeight}
							style="ratio: {post.coverWidth} / {post.coverHeight}"
						/>
					</a>
				{/if}
				<header>
					<a href="/blog/{post.slug}" rel="full-article">
						<h2>
							{post.title}
						</h2>
					</a>
					<time datetime={post.date}>{dateString}</time>
				</header>

				{@html post.excerpt}

				{#if !post.has_excerpt}
					<a href="/blog/{post.slug}" class="read-on" rel="full-article">Read on</a>
				{/if}
			</article>
		</li>
	{/each}
</ul>

<style>
	article {
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
	}
	a:hover,
	a:focus {
		text-decoration: underline;
	}

	h2 {
		font-size: 40px;
		text-wrap: pretty;
	}

	time {
		text-transform: uppercase;
		position: absolute;
		top: 0;
		color: var(--grayed-text);
	}

	.read-on {
		background-color: var(--button-dark-background);
		display: inline-block;
		padding: 0.4em 0.8em;
		margin-right: 0.5em;
		text-decoration: none;
		color: #fff;
		transition: 0.15s;
	}

	.read-on:hover {
		background-color: var(--link-color-hover);
	}

	.read-on::after {
		content: '\2192';
		display: inline-block;
		transform: translateX(4px);
		transition: 0.15s;
	}
	.read-on:hover::after {
		transform: translateX(6px);
	}
</style>
