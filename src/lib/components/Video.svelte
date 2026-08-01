<script>
  import { browser } from '$app/environment';
  /**
   * @typedef {Object} Props
   * @property {any} src
   * @property {string} [type]
   * @property {any} width
   * @property {any} height
   * @property {any} alt
   * @property {number} [max_display_width]
   * @property {string} [quality]
   * @property {boolean} [controls]
   */

  /** @type {Props} */
  let {
    src = $bindable(),
    type = 'video/mp4',
    width,
    height,
    alt,
    max_display_width = 790,
    quality = 'auto',
    controls = true,
  } = $props();

  const display_src = $derived(src.replace(/\/upload\//, `/upload/q_${quality}/`));

  const aspect_ratio = $derived(width / height);
  const high_dpi = browser ? window.devicePixelRatio >= 2 : false;

  const width_based_on_dpi = $derived(high_dpi ? Math.round(width / 2) : width);

  const display_width = $derived(Math.min(width_based_on_dpi, max_display_width));
  const display_height = $derived(Math.round(display_width / aspect_ratio));
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video {controls} width={display_width} height={display_height}>
  <source src={display_src} {type} />
  <p>{alt}</p>
</video>

<style>
  video {
    box-sizing: content-box;
    max-width: 100%;
    height: auto;
    border-radius: 0.3rem;
    border: light-dark(var(--background-color), var(--gray-accent)) 0.3rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-block-end: 0.5rem;
  }
</style>
