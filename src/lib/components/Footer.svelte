<script>
	import { site_author } from '$lib/config';

	export let style = '';
</script>

<footer {style}>
	<nav>
		<ul>
			<li>
				<p>&copy;{new Date().getFullYear()} {site_author}</p>
			</li>
			<li>
				<a href="/blog/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<a href="/blog">Blog home</a>
			</li>
			<li>
				<a href="/">Personal website</a>
			</li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		position: absolute;
		bottom: 25px;
		left: var(--content-gutter);
		right: var(--content-gutter);
	}

	ul {
		display: flex;
		gap: var(--nav-gap);
	}
</style>
