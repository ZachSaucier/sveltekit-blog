<script>
	import { posts_per_page } from '$lib/config';

	export let current_page;
	export let total_posts;
	export let path = '/blog/page';

	let pages_available;
	$: pages_available = Math.ceil(total_posts / posts_per_page);

	const is_current_page = (page) => (page === current_page ? 'page' : false);
</script>

<!-- For some reason, the pagination wasn't re-rendering properly during navigation without the #key block -->
{#key current_page}
	{#if pages_available > 1}
		<section>
			<nav aria-label="Pagination navigation">
				<ul>
					{#each Array.from({ length: pages_available }, (_, i) => i + 1) as page}
						<li>
							<a href="{path}/{page}" aria-current={is_current_page(page)}>
								<span class="sr-only">
									{#if is_current_page(page)}
										Current page
									{:else}
										Go to page
									{/if}
								</span>
								{page}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</section>
	{/if}
{/key}

<style>
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
