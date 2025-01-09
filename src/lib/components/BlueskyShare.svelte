<script>
  import { bluesky_handle } from '$lib/config';

  export let text = null;
  export let url;
  export let hashtags = null;
  export let related = null;

  $: query = [
    `via=${encodeURIComponent(bluesky_handle)}`,
    text && `text=${encodeURIComponent(text)}`,
    url && `url=${encodeURIComponent(url)}`,
    hashtags && `hashtags=${hashtags}`,
    related && `related=${encodeURIComponent(related)}`,
  ]
    .filter(Boolean)
    .join('&');

  $: href = `https://bsky.app/intent/compose?${query}`;
</script>

{#key query}
  <a target="_blank" noreferrer class="button" {href}> Share to Bluesky </a>
{/key}

<style>
  .button {
    margin-top: 1.5rem;
  }
</style>
