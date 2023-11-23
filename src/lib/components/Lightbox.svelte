<script>
  export let src;
  export let alt;
  export let loading = 'lazy';
  export let width;
  export let height;
  export let display_width = 790;

  let display_src = src.replace(/\/upload\//, `/upload/w_${display_width}/`);

  let dialog;
  let intention = false;

  function showIntention() {
    intention = true;
  }

  function openLightbox() {
    dialog.showModal();
  }

  function closeLightbox() {
    dialog.close();
  }
</script>

{#if width < display_width}
  <!-- If image is too small to lightbox, don't add the functionality -->
  <img
    class="lightbox__button_open lightbox__image_inline"
    src={display_src}
    {alt}
    {loading}
    {width}
    {height}
  />
{:else}
  <button
    class="lightbox__button_open"
    on:pointerenter={showIntention}
    on:focus={showIntention}
    on:click={openLightbox}
    aria-label="View larger image"
  >
    <img class="lightbox__image_inline" src={display_src} {alt} {loading} {width} {height} />
  </button>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <dialog bind:this={dialog} on:click={closeLightbox}>
    <!-- svelte-ignore a11y-autofocus -->
    <button class="lightbox__close" autofocus on:click={closeLightbox}>Close</button>
    {#if intention}
      <img class="lightbox__image_full" {src} {alt} {width} {height} />
    {/if}
  </dialog>
{/if}

<style>
  .lightbox__button_open {
    padding: 0;
    background: none !important;

    border-radius: 0.3rem;
    border: var(--background-color) 0.5rem solid;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    margin-bottom: 0.5rem;
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
