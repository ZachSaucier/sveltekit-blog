<script>
  import { bluesky_handle } from '$lib/config';

  /**
   * @typedef {Object} Props
   * @property {any} [text]
   * @property {any} url
   * @property {any} [hashtags]
   * @property {any} [related]
   */

  /** @type {Props} */
  let { text = null, url, hashtags = null, related = null } = $props();

  let query = $derived(
    [
      `via=${encodeURIComponent(bluesky_handle)}`,
      text && `text=${encodeURIComponent(text)}`,
      url && `url=${encodeURIComponent(url)}`,
      hashtags && `hashtags=${hashtags}`,
      related && `related=${encodeURIComponent(related)}`,
    ]
      .filter(Boolean)
      .join('&'),
  );

  let href = $derived(`https://bsky.app/intent/compose?${query}`);
</script>

{#key query}
  <a target="_blank" noreferrer class="button" {href}> Share to Bluesky </a>
{/key}
