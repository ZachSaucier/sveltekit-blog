<script>
  import { twitter_handle } from '$lib/config';

  export let text = null;
  export let url;
  export let hashtags = null;
  export let related = null;

  $: query = [
    `via=${encodeURIComponent(twitter_handle)}`,
    text && `text=${encodeURIComponent(text)}`,
    url && `url=${encodeURIComponent(url)}`,
    hashtags && `hashtags=${hashtags}`,
    related && `related=${encodeURIComponent(related)}`,
  ]
    .filter(Boolean)
    .join('&');

  $: href = `https://twitter.com/intent/tweet?${query}`;
</script>

<svelte:head>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</svelte:head>

<a target="_blank" noreferrer class="twitter-share-button" {href} data-size="large"> Tweet</a>
