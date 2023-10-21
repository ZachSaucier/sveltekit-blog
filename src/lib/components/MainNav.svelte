<script>
	import { navItems } from '$lib/config';
	import { currentPage } from '$lib/utilities/store';
	import Icon from '$lib/components/Icon.svelte';
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
		<li>
			<a href="/blog/api/rss.xml">
				<Icon type="RSS Feed" width={29} fill="white" />
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		font-size: 18px;
	}

	ul {
		height: 80px;
		display: flex;
		gap: var(--nav-gap);
		align-items: center;
		justify-content: right;
	}

	a {
		color: white;
		text-decoration: none;
	}

	a:hover,
	a:focus {
		text-decoration: underline;
	}
</style>
