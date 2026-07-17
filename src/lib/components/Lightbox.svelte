<script>
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

{#if display_width < max_display_width}
  <!-- If image is too small to lightbox, don't add the functionality -->
  <img
    class="lightbox__button_open lightbox__image_inline"
    src={display_src}
    srcset={srcset}
    sizes={`(max-width: ${max_display_width}px) 100vw, ${max_display_width}px`}
    {alt}
    {loading}
    width={display_width}
    height={display_height}
    data-pagefind-index-attrs="alt"
  />
{:else}
  <div class="lightbox__wrapper" style:--lightbox-threshold={`${max_display_width}px`}>
    <img
      class="lightbox__image_inline lightbox__image_inline--fallback"
      src={display_src}
      srcset={srcset}
      sizes={`(max-width: ${max_display_width}px) 100vw, ${max_display_width}px`}
      {alt}
      {loading}
      width={display_width}
      height={display_height}
    />

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
  </div>

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
{/if}

<style>
  .lightbox__wrapper {
    container-type: inline-size;
    display: block;
  }

  .lightbox__button_open {
    display: none;
    box-sizing: content-box;
    padding: 0;
    background: none !important;

    border-radius: 0.3rem;
    border: var(--background-color) 0.3rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-block-end: 0.5rem;
  }

  .lightbox__image_inline--fallback {
    display: block;
  }

  @container (min-width: 790px) {
    .lightbox__button_open {
      display: block;
    }

    .lightbox__image_inline--fallback {
      display: none;
    }
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
