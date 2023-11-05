<script>
	import { posts_per_page, tags_per_page } from '$lib/config';

	export let current_page;
	export let path = '/blog/page';
	export let total_posts;
	export let lower_bound;
	export let upper_bound;
	export let is_tag_pagination = false;

	const per_page = is_tag_pagination ? tags_per_page : posts_per_page;
	const pages_available = Math.ceil(total_posts / per_page);

	const is_current_page = (page) => (page === current_page ? 'page' : false);

	const is_small_num_pages = pages_available <= 5;

	const pages_to_show = [];
	if (is_small_num_pages) {
		for (let i = 1; i <= pages_available; i++) {
			pages_to_show.push(i);
		}
	} else {
		for (let i = current_page - 2; i < current_page + 3; i++) {
			if (i > 0 && i <= pages_available) {
				pages_to_show.push(i);
			}
		}
	}
</script>

<!-- For some reason, pagination clicks don't re-render properly without the #key block -->
{#key current_page}
	{#if pages_available > 1}
		<nav aria-label="Pagination navigation">
			<p>Posts {lower_bound}–{upper_bound} of {total_posts}</p>

			<ul>
				{#if !is_small_num_pages && current_page > 3}
					<li>
						<a href="{path}/1" aria-label="Go to first page">&lt;&lt;</a>
					</li>
				{/if}

				<!-- {#if current_page > 1}
						<li>
							<a href="{path}/{current_page - 1}" aria-label="Go to previous page">&lt;</a>
						</li>
					{/if} -->

				{#each pages_to_show as page}
					<li>
						<a
							href="{path}/{page}"
							aria-current={is_current_page(page)}
							aria-label="Go to page {page}"
						>
							{page}
						</a>
					</li>
				{/each}

				<!-- {#if current_page < pages_available}
						<li>
							<a href="{path}/{current_page + 1}" aria-label="Go to next page">&gt;</a>
						</li>
					{/if} -->

				{#if !is_small_num_pages && current_page < pages_available - 2}
					<li>
						<a href="{path}/{pages_available}" aria-label="Go to last page">&gt;&gt;</a>
					</li>
				{/if}
			</ul>
		</nav>
	{/if}
{/key}

<style>
	nav {
		display: flex;
		justify-content: space-between;
	}

	ul {
		display: flex;
		gap: 3px;
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color);
		font-size: 0.8em;
		line-height: 1.5em;
		color: var(--accent-dark);
		border-radius: 0.4em;
		border: 1px solid #ddd;
		width: 32px;
		height: 32px;

		&[aria-current='page'] {
			background-color: var(--accent-dark);
			color: var(--background-color);
		}
	}
</style>
