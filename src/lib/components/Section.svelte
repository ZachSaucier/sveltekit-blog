<script>
  export let no_border = false;
</script>

<section class:no_border>
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
