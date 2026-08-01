<script>
  import { twitter_handle } from '$lib/config';

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
      `via=${encodeURIComponent(twitter_handle)}`,
      text && `text=${encodeURIComponent(text)}`,
      url && `url=${encodeURIComponent(url)}`,
      hashtags && `hashtags=${hashtags}`,
      related && `related=${encodeURIComponent(related)}`,
    ]
      .filter(Boolean)
      .join('&'),
  );

  let href = $derived(`https://twitter.com/intent/tweet?${query}`);
</script>

<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

{#key query}
  <a target="_blank" noreferrer class="twitter-share-button" {href} data-size="large"> Tweet</a>
{/key}
