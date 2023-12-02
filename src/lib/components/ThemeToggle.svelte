<script>
  import { browser } from '$app/environment';
  import { getCookie, setCookie } from '$lib/utilities/cookies';
  import Icon from '$lib/components/Icon.svelte';

  let is_dark_mode = false;

  if (browser) {
    const theme_cookie = getCookie('theme');
    is_dark_mode = theme_cookie === 'dark';
    if (theme_cookie) {
      if (theme_cookie === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      setCookie('theme', 'dark');
    } else {
      setCookie('theme', 'light');
    }
  }

  function handleSwitchDarkMode() {
    is_dark_mode = !is_dark_mode;

    setCookie('theme', is_dark_mode ? 'dark' : 'light');

    is_dark_mode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
</script>

<svelte:head>
  <script>
    const getInitCookie = (cookieName) =>
      (document.cookie.match(`(^|;) *${cookieName}=([^;]*)`) || [])[2];

    if (getInitCookie('theme')) {
      if (getInitCookie('theme') === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
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

<label for="theme_toggle" title={is_dark_mode ? 'Switch to light theme' : 'Switch to dark theme'}>
  <Icon type="Sun" width={29} />
  <Icon type="Moon" width={29} />
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
