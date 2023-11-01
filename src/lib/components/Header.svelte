<script>
	import MainNav from '$lib/components/MainNav.svelte';

	export let style = '';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header {style}>
	<a on:click|preventDefault={focusMain} class="skip_to_content" href="#main">
		Skip to main content
	</a>

	<div class="site_title_wrapper">
		<a href="/blog">
			<h1>Musings</h1>
		</a>
		<h2>Zach Saucier's thoughts</h2>
	</div>

	<MainNav />
</header>

<style>
	.skip_to_content {
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
		color: var(--background-color);
	}
	.skip_to_content:focus {
		transform: translateY(6rem);
		opacity: 1;
		z-index: 2;
	}

	header {
		padding-right: 25px;
	}

	.site_title_wrapper {
		text-align: right;
		padding: 22px 0 17px 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	h1 {
		font-size: 2.826rem;
		text-decoration: none;
		color: var(--button-dark-background);
	}

	h2 {
		font-size: 1.3rem;
		color: var(--grayed-text);
	}

	@media (max-width: 749px) {
		.site_title_wrapper {
			gap: 3px;
			padding-top: 10px;
		}

		h1 {
			font-size: 1.91rem;
		}

		h2 {
			font-size: 0.87rem;
		}
	}
</style>
