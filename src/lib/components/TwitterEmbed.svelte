<script>
  import { browser } from '$app/environment';

  export let expandable = false;

  let theme = 'light';

  if (browser) {
    theme = localStorage.theme;
  }
</script>

<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

{#if expandable}
  <details>
    <summary>View tweet</summary>
    <blockquote class="twitter-tweet" data-theme={theme}>
      <slot />
    </blockquote>
  </details>
{:else}
  <blockquote class="twitter-tweet" data-theme={theme}>
    <slot />
  </blockquote>
{/if}

<style>
  blockquote.twitter-tweet {
    display: inline-block;
    font-family: 'Helvetica Neue', Roboto, 'Segoe UI', Calibri, sans-serif;
    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
    border-color: #eee #ddd #bbb;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    margin: 10px 5px;
    padding: 0 16px 16px 16px;
    max-width: 468px;
  }

  :global(blockquote.twitter-tweet p) {
    font-size: 16px;
    font-weight: normal;
    line-height: 20px;
  }

  :global(blockquote.twitter-tweet a) {
    color: inherit;
    font-weight: normal;
    text-decoration: none;
    outline: 0 none;
  }

  :global(blockquote.twitter-tweet a:hover),
  :global(blockquote.twitter-tweet a:focus) {
    text-decoration: underline;
  }
</style>
