<script>
  /**
   * @typedef {Object} Props
   * @property {string} src - Cloudinary URL without w_/q_ params
   * @property {string} alt
   * @property {string} [loading]
   * @property {number} width
   * @property {number} height
   * @property {number} [max_display_width]
   * @property {string} [quality]
   */

  /** @type {Props} */
  let {
    src,
    alt,
    loading = 'lazy',
    width,
    height,
    max_display_width = 790,
    quality = 'auto',
  } = $props();

  const aspect_ratio = $derived(width / height);
  const display_width = $derived(Math.min(width, max_display_width));
  const display_height = $derived(Math.round(display_width / aspect_ratio));

  function buildCloudinaryUrl(width_value) {
    return src.replace(/\/upload\//, `/upload/w_${width_value}/q_${quality}/`);
  }

  const candidate_widths = $derived(
    Array.from(new Set([display_width, Math.round(display_width * 2), width].filter(Boolean))).sort(
      (a, b) => a - b,
    ),
  );

  const srcset = $derived(
    candidate_widths
      .map((candidateWidth) => `${buildCloudinaryUrl(candidateWidth)} ${candidateWidth}w`)
      .join(', '),
  );
  const display_src = $derived(buildCloudinaryUrl(display_width));
  const full_src = $derived(buildCloudinaryUrl(width));

  let dialog = $state();
  let close_button = $state();
  let intention = $state(false);

  function showIntention() {
    intention = true;
  }

  function openLightbox() {
    intention = true;
    dialog.showModal();
    close_button.focus();
  }

  function closeLightbox() {
    dialog.close();
  }
</script>

{#if width >= max_display_width}
  <button
    class="lightbox__button_open"
    onpointerenter={showIntention}
    onfocus={showIntention}
    onclick={openLightbox}
    aria-label="View larger image"
  >
    <img
      class="lightbox__image_inline"
      src={display_src}
      {srcset}
      sizes={`(max-width: ${max_display_width}px) 100vw, ${max_display_width}px`}
      {alt}
      {loading}
      width={display_width}
      height={display_height}
    />
  </button>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <dialog bind:this={dialog} onclick={closeLightbox}>
    <button bind:this={close_button} class="lightbox__close" onclick={closeLightbox}>Close</button>
    {#if intention}
      <img class="lightbox__image_full" src={full_src} {alt} {width} {height} />
    {/if}
  </dialog>
{:else}
  <img
    class="lightbox__image_inline"
    src={display_src}
    {srcset}
    sizes={`(max-width: ${max_display_width}px) 100vw, ${max_display_width}px`}
    {alt}
    {loading}
    width={display_width}
    height={display_height}
    data-pagefind-index-attrs="alt"
  />
{/if}

<style>
  .lightbox__button_open {
    box-sizing: content-box;
    padding: 0;
    background: none !important;

    border-radius: 0.3rem;
    border: light-dark(var(--background-color), var(--gray-accent)) 0.3rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-block-end: 0.5rem;
  }

  dialog {
    background: transparent;
    padding: 0;
    border: 0;
    min-width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    max-height: 100vh;
    align-items: center;
    justify-content: center;
    overscroll-behavior: contain;
  }
  dialog[open] {
    display: flex;
  }

  ::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .lightbox__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
</style>
