<script>
  let { title, children } = $props();
</script>

<header>
  <h1>{title}</h1>
  <div>
    {@render children?.()}
  </div>
</header>

<style>
  header {
    font-family: var(--font-sans-serif);
    margin-block-end: 1em;
    padding-bottom: 0.5em;
    background: var(--border-dashed);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  h1 {
    font-size: 2em;
    font-weight: bold;
  }
</style>
