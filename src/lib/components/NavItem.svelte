<script>
	import { currentPage } from '$lib/utilities/store';

	export let href;

	$: isCurrentPage = $currentPage.startsWith(href);
</script>

<li>
	<a {href} class:active={isCurrentPage} aria-current={isCurrentPage ? 'page' : false}>
		<slot />
	</a>
</li>
