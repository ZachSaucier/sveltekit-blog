<script>
	import dateParser from '$lib/utilities/dateParser';
	export let posts = [];
	export let category = '';

	export let lower_bound;
	export let upper_bound;
	export let total_posts;
</script>

<section>
	<h1 class="category_title">Blog category: {category}</h1>
	{#if total_posts}
		<p>Posts {lower_bound}–{upper_bound} of {total_posts}</p>
	{/if}
</section>

<ul>
	{#each posts as post}
		{@const { date, date_string } = dateParser(post.date)}
		{@const path = `/blog/${post.slug}`}
		<li>
			<section>
				<header class="post_header">
					<a href={path} rel="full-article">
						<h2 class="post_title">
							{post.title}
						</h2>
					</a>

					<time class="post_date" datetime={date}>{date_string}</time>
				</header>

				<article>
					{@html post.description}
				</article>
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
</style>
