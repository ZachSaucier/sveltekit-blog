<script>
  import { browser } from '$app/environment';
  import { getCookie, setCookie } from '$lib/utilities/cookies';
  import Icon from '$lib/components/Icon.svelte';

  let is_dark_mode = false;

  if (browser) {
    const theme_cookie = getCookie('theme');
    is_dark_mode = theme_cookie === 'dark';
    if (theme_cookie) {
      // User has explicitly chosen a theme - apply it
      document.documentElement.dataset.theme = theme_cookie;
    }
    // If no cookie, don't set data-theme - let color-scheme: light dark follow system preference
  }

  function handleSwitchDarkMode() {
    is_dark_mode = !is_dark_mode;

    const newTheme = is_dark_mode ? 'dark' : 'light';
    setCookie('theme', newTheme);
    document.documentElement.dataset.theme = newTheme;
  }
</script>

<svelte:head>
  <script>
    const getInitCookie = (cookieName) =>
      (document.cookie.match(`(^|;) *${cookieName}=([^;]*)`) || [])[2];

    const themeCookie = getInitCookie('theme');
    if (themeCookie) {
      // User has explicitly chosen a theme - apply it
      document.documentElement.dataset.theme = themeCookie;
    }
    // If no cookie, don't set data-theme - let color-scheme: light dark follow system preference
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
