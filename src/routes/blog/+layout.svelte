<script>
	import { preloadCode } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { currentPage } from '$lib/utilities/store';
	import { navItems } from '$lib/config';

	import Ribbons from '$lib/components/Ribbons.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;

	const transitionIn = { delay: 150, duration: 150 };
	const transitionOut = { duration: 100 };

	/**
	 * Updates the global store with the current path. (Used for highlighting
	 * the current page in the nav, but could be useful for other purposes.)
	 **/
	$: currentPage.set(data.path);

	/**
	 * This pre-fetches all top-level routes on the site in the background for faster loading.
	 * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
	 *
	 * Any route added in src/lib/config.js will be preloaded automatically. You can add your
	 * own preloadData() calls here, too.
	 **/

	onMount(() => {
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);
	});
</script>

<div class="content">
	<Ribbons />

	<Header />

	{#key data.path}
		<main id="main" tabindex="-1" in:fade={transitionIn} out:fade={transitionOut}>
			<slot />
		</main>
	{/key}

	<Sidebar />

	<Footer />
</div>

<style>
	.content {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 300px;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'Header Header'
			'Main Aside'
			'Footer Footer';
	}

	Header {
		grid-area: Header;
	}
	main {
		grid-area: Main;
	}
	Sidebar {
		grid-area: Aside;
	}
	Footer {
		grid-area: Footer;
	}
</style>
