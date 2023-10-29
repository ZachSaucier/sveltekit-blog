<script>
	import { nav_items } from '$lib/config';
	import { currentPage } from '$lib/utilities/store';
	import Icon from '$lib/components/Icon.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<nav>
	<ul>
		{#each nav_items as page}
			{@const href = page.route}
			{@const isCurrentPage = $currentPage.startsWith(href)}
			<li>
				<a {href} class:active={isCurrentPage} aria-current={isCurrentPage ? 'page' : false}>
					{page.title}
				</a>
			</li>
		{/each}
		<li class="search_item">
			<form action="https://www.google.com/search" method="get">
				<fieldset role="search">
					<input type="hidden" name="q" value="site:zachsaucier.com/blog" />
					<input class="search" type="text" name="q" results="0" placeholder="Search" />
				</fieldset>
			</form>
		</li>
		<li class="theme_toggle_item">
			<ThemeToggle />
		</li>
		<li>
			<a class="rss_link" href="/blog/api/rss.xml">
				<Icon type="RSS Feed" width={29} fill="var(--background-color)" />
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		font-size: 18px;
	}

	.search {
		padding: 5px;
		border-radius: 100px;
		border: none;
	}

	:global(html.dark .search) {
		border: 1px solid var(--background-color);
	}

	ul {
		height: 80px;
		display: flex;
		gap: var(--nav-gap);
		align-items: center;
		justify-content: right;
	}

	.search_item {
		margin-right: -10px;
	}

	.theme_toggle_item {
		margin-right: -5px;
	}

	a {
		color: var(--background-color);
		text-decoration: none;
	}

	a:hover,
	a:focus {
		text-decoration: underline;
	}

	.rss_link {
		display: flex;
	}
</style>
