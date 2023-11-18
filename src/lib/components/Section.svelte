<script>
  export let no_border = false;
  export let class_name = '';
</script>

<section class:class_name class:no_border>
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
