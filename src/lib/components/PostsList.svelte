<script>
	export let posts = [];
	console.log(posts);
</script>

<ul class="posts-list">
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
				<a href="/blog/{post.slug}">
					{#if post.coverImage}
						<img
							src={post.coverImage}
							alt=""
							width={post.coverWidth}
							height={post.coverHeight}
							style="ratio: {post.coverWidth} / {post.coverHeight}"
						/>
					{/if}
					<header>
						<h2>
							{post.title}
						</h2>
						<time datetime={post.date}>{dateString}</time>
					</header>

					<p>{post.description}</p>
				</a>
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
</style>
