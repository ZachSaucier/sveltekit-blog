<script>
  // Lightbox component for responsive images with zoom modal
  // Expected src format: https://res.cloudinary.com/[account]/image/upload/[path]
  // Do not include width (w_) or quality (q_) parameters in the src URL—the component will add them
  
  export let src;
  export let alt;
  export let loading = 'lazy';
  export let width;
  export let height;
  export let max_display_width = 790;
  export let quality = 'auto';

  const aspect_ratio = width / height;
  const display_width = Math.min(width, max_display_width);
  const display_height = Math.round(display_width / aspect_ratio);

  function buildCloudinaryUrl(width_value) {
    return src.replace(/\/upload\//, `/upload/w_${width_value}/q_${quality}/`);
  }

  const candidate_widths = Array.from(
    new Set([display_width, Math.round(display_width * 2), width].filter(Boolean))
  ).sort((a, b) => a - b);

  const srcset = candidate_widths
    .map((candidateWidth) => `${buildCloudinaryUrl(candidateWidth)} ${candidateWidth}w`)
    .join(', ');
  const display_src = buildCloudinaryUrl(display_width);
  const full_src = buildCloudinaryUrl(width);

  let dialog;
  let close_button;
  let intention = false;

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
    on:pointerenter={showIntention}
    on:focus={showIntention}
    on:click={openLightbox}
    aria-label="View larger image"
  >
    <img
      class="lightbox__image_inline"
      src={display_src}
      srcset={srcset}
      sizes={`(max-width: ${max_display_width}px) 100vw, ${max_display_width}px`}
      {alt}
      {loading}
      width={display_width}
      height={display_height}
    />
  </button>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <dialog bind:this={dialog} on:click={closeLightbox}>
    <button bind:this={close_button} class="lightbox__close" on:click={closeLightbox}>Close</button>
    {#if intention}
      <img
        class="lightbox__image_full"
        src={full_src}
        {alt}
        width={width}
        height={height}
      />
    {/if}
  </dialog>
{:else}
  <img
    class="lightbox__image_inline"
    src={display_src}
    srcset={srcset}
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
    border: var(--background-color) 0.3rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-block-end: 0.5rem;
  }

  :global(html.dark .lightbox__button_open) {
    border-color: var(--gray-accent);
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
