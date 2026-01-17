<script>
  let { searchable = false, no_border = false, children } = $props();
</script>

<section class:no_border data-pagefind-body={searchable || null}>
  {@render children()}
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
