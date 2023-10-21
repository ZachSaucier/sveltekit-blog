<script>
	import { navItems } from '$lib/config';
	import NavItem from '$lib/components/NavItem.svelte';
</script>

<nav class="main-nav">
	<ul>
		{#each navItems as page}
			<NavItem href={page.route}>
				{page.title}
			</NavItem>
		{/each}
	</ul>
</nav>
