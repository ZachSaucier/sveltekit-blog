<script>
	import { siteTitle } from '$lib/config';
	import MainNav from '$lib/components/MainNav.svelte';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header>
	<a on:click|preventDefault={focusMain} class="skip-to-content-link" href="#main">
		Skip to main content
	</a>

	<a href="/" class="site-title">
		{siteTitle}
	</a>

	<MainNav />
</header>
