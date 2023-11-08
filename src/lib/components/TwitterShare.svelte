<script>
  import { twitter_handle } from '$lib/config';
  import Icon from '$lib/components/Icon.svelte';

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

<a target="_blank" noreferrer {href}>
  <Icon type="Twitter" fill="currentColor" width={20} />
  Tweet this
</a>

<style>
  a {
    font-family: var(--font-sans-serif);
    font-size: 0.8em;
    display: inline-flex;
    gap: 5px;
    background-color: var(--accent);
    color: var(--background-color);
    padding: 0.3em 0.5em;
    border-radius: 0.3em;

    &:hover {
      /* border-bottom: 2px solid rgb(29, 161, 242); */
    }
  }
</style>
