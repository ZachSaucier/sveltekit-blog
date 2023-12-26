<script>
  export let searchable = false;
  export let no_border = false;
</script>

<section class:no_border data-pagefind-body={searchable || null}>
  <slot />
</section>

<style>
  section {
    padding: 2rem var(--content-gutter);
    background: var(--border-dashed);
  }

  .no_border {
    background: none;
    padding-bottom: 0;
  }
</style>
