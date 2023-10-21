<script>
	import { siteAuthor } from '$lib/config';
	import MainNav from '$lib/components/MainNav.svelte';
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/blog/api/rss.xml" data-sveltekit-reload>RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
		</ul>
	</nav>

	<p>&copy;{new Date().getFullYear()} {siteAuthor}</p>
</footer>
