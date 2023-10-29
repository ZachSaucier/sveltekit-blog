<script>
	import { browser } from '$app/environment';
	import Icon from '$lib/components/Icon.svelte';

	let isDarkMode = false;

	function handleSwitchDarkMode() {
		isDarkMode = !isDarkMode;

		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

		isDarkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			isDarkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			isDarkMode = false;
		}
	}
</script>

<input
	id="theme-toggle"
	class="sr-only"
	checked={isDarkMode}
	on:click={handleSwitchDarkMode}
	type="checkbox"
/>
<label for="theme-toggle">
	<Icon type="ThemeToggle" width={29} fill="var(--background-color)" state={{ isDarkMode }} />
</label>

<style>
	label {
		cursor: pointer;
	}
</style>
