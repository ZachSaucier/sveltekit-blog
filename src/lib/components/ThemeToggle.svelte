<script>
  import { browser } from '$app/environment';
  import Icon from '$lib/components/Icon.svelte';

  let is_dark_mode = false;

  if (browser) {
    is_dark_mode = localStorage.theme === 'dark' ? true : false;
  }

  function handleSwitchDarkMode() {
    is_dark_mode = !is_dark_mode;

    localStorage.setItem('theme', is_dark_mode ? 'dark' : 'light');

    is_dark_mode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
</script>

<svelte:head>
  <script>
    if (localStorage.theme) {
      if (localStorage.theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  </script>
</svelte:head>

<input
  id="theme_toggle"
  name="Theme toggle"
  checked={is_dark_mode}
  on:click={handleSwitchDarkMode}
  type="checkbox"
/>
<label for="theme_toggle">
  <Icon type="ThemeToggle" state={{ is_dark_mode }} width={29} />
</label>

<style>
  input {
    display: none;
  }

  label {
    display: flex;
    cursor: pointer;
  }
</style>
