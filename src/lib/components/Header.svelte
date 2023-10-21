<script>
	import MainNav from '$lib/components/MainNav.svelte';

	export let style = '';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header {style}>
	<a on:click|preventDefault={focusMain} class="skip-to-content-link" href="#main">
		Skip to main content
	</a>

	<div class="site_title_wrapper">
		<a href="/blog" class="site_title">
			<h1>Musings</h1>
		</a>
		<h2>Zach Saucier's thoughts</h2>
	</div>

	<MainNav />
</header>

<style>
	.skip-to-content-link {
		position: absolute;
		top: -6rem;
		left: 0;
		padding: 0.5em;
		opacity: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		background-color: var(--accent-dark);
		color: white;
	}
	.skip-to-content-link:focus {
		transform: translateY(6rem);
		opacity: 1;
		z-index: 2;
	}

	header {
		height: 210px;
		padding-right: 55px;
	}

	.site_title_wrapper {
		text-align: right;
		padding: 22px 0 17px 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.site_title {
		font-size: 52px;
		text-decoration: none;
		color: #4b4b4b;
	}

	h2 {
		font-size: 24px;
		color: var(--grayed-text);
	}
</style>
