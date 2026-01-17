<script>
  import { browser } from '$app/environment';

  let {
    src,
    alt,
    loading = 'lazy',
    width,
    height,
    max_display_width = 790,
    quality = 'auto'
  } = $props();

  const aspect_ratio = $derived(width / height);
  const high_dpi = $derived(browser ? window.devicePixelRatio >= 2 : false);

  const width_based_on_dpi = $derived(high_dpi ? Math.round(width / 2) : width);
  const height_based_on_dpi = $derived(high_dpi ? Math.round(height / 2) : height);

  const display_width = $derived(Math.min(width_based_on_dpi, max_display_width));
  const display_height = $derived(Math.round(display_width / aspect_ratio));

  const should_double_src_size = $derived(high_dpi && width >= display_width * 2);

  const display_src = $derived(
    src.replace(
      /\/upload\//,
      `/upload/w_${should_double_src_size ? display_width * 2 : display_width}/q_${quality}/`
    )
  );

  let dialog = $state();
  let close_button = $state();
  let intention = $state(false);

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
    data-pagefind-index-attrs="alt"
  />
{:else}
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
      {alt}
      {loading}
      width={display_width}
      height={display_height}
      data-pagefind-index-attrs="alt"
    />
  </button>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <dialog bind:this={dialog} onclick={closeLightbox}>
    <button bind:this={close_button} class="lightbox__close" onclick={closeLightbox}>Close</button>
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
