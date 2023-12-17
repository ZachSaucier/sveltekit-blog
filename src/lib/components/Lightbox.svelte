<script>
  import { browser } from '$app/environment';

  export let src;
  export let alt;
  export let loading = 'lazy';
  export let width;
  export let height;
  export let max_display_width = 790;
  export let quality = 'auto';

  const aspect_ratio = width / height;
  const high_dpi = browser ? window.devicePixelRatio >= 2 : false;

  const width_based_on_dpi = high_dpi ? Math.round(width / 2) : width;
  const height_based_on_dpi = high_dpi ? Math.round(height / 2) : height;

  const display_width = Math.min(width_based_on_dpi, max_display_width);
  const display_height = Math.round(display_width / aspect_ratio);

  const should_double_src_size = high_dpi && width >= display_width * 2;

  const display_src = src.replace(
    /\/upload\//,
    `/upload/w_${should_double_src_size ? display_width * 2 : display_width}/q_${quality}/`
  );

  let dialog;
  let close_button;
  let intention = false;

  function showIntention() {
    intention = true;
  }

  function openLightbox() {
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
    {alt}
    {loading}
    width={display_width}
    height={display_height}
  />
{:else}
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
        {src}
        {alt}
        width={width_based_on_dpi}
        height={height_based_on_dpi}
      />
    {/if}
  </dialog>
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
