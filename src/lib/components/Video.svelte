<script>
  import { browser } from '$app/environment';
  export let src;
  export let type = 'video/mp4';
  export let width;
  export let height;
  export let alt;
  export let max_display_width = 790;
  export let quality = 'auto';
  export let controls = true;

  src = src.replace(/\/upload\//, `/upload/q_${quality}/`);

  const aspect_ratio = width / height;
  const high_dpi = browser ? window.devicePixelRatio >= 2 : false;

  const width_based_on_dpi = high_dpi ? Math.round(width / 2) : width;

  const display_width = Math.min(width_based_on_dpi, max_display_width);
  const display_height = Math.round(display_width / aspect_ratio);
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video {controls} width={display_width} height={display_height}>
  <source {src} {type} />
  <p>{alt}</p>
</video>

<style>
  video {
    box-sizing: content-box;
    max-width: 100%;
    height: auto;
    border-radius: 0.3rem;
    border: var(--background-color) 0.3rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-block-end: 0.5rem;
  }

  :global(html.dark video) {
    border-color: var(--gray-accent);
  }
</style>
