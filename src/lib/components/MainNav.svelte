<script>
	import { navItems } from '$lib/config';
	import { currentPage } from '$lib/utilities/store';
	import Icon from '$lib/components/Icon.svelte';

	function handleSearch(e) {
		const query = search_el.value;
		if (query) {
			window.location.href = `https://www.google.com/search?q=site%3Azachsaucier.com%2Fblog&q=${query}`;
		}
	}
	// https://www.google.com/search?q=site%3Azachsaucier.com%2Fblog&q=remix
</script>

<nav>
	<ul>
		{#each navItems as page}
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
					<input type="text" name="q" results="0" placeholder="Search" />
				</fieldset>
			</form>
		</li>
		<li>
			<a class="rss_link" href="/blog/api/rss.xml">
				<Icon type="RSS Feed" width={29} fill="white" />
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		font-size: 18px;
	}

	input {
		padding: 5px;
		border-radius: 100px;
		border: none;
	}

	ul {
		height: 80px;
		display: flex;
		gap: var(--nav-gap);
		align-items: center;
		justify-content: right;
	}

	.search_item {
		margin-right: -5px;
	}

	a {
		color: white;
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
