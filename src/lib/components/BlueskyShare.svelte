<script>
  import { bluesky_handle } from '$lib/config';

  let { text = null, url, hashtags = null, related = null } = $props();

  const query = $derived(
    [
      `via=${encodeURIComponent(bluesky_handle)}`,
      text && `text=${encodeURIComponent(text)}`,
      url && `url=${encodeURIComponent(url)}`,
      hashtags && `hashtags=${hashtags}`,
      related && `related=${encodeURIComponent(related)}`,
    ]
      .filter(Boolean)
      .join('&')
  );

  const href = $derived(`https://bsky.app/intent/compose?${query}`);
</script>

{#key query}
  <a target="_blank" noreferrer class="button" {href}> Share to Bluesky </a>
{/key}
