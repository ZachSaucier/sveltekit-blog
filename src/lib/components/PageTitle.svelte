<script>
	export let title;
</script>

<header>
	<h1>{title}</h1>
	<div>
		<slot />
	</div>
</header>

<style>
	header {
		font-family: var(--font-sans-serif);
		margin-bottom: 1em;
		padding-bottom: 0.5em;
		background: var(--border-dashed);
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	h1 {
		font-size: 2em;
		font-weight: bold;
	}
</style>
