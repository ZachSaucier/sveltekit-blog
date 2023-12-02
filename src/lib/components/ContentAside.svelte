<script>
  export let type = 'default';
</script>

<aside class="content_aside content_aside--{type}">
  <slot />
</aside>

<style>
  .content_aside {
    font-size: 13px;
    line-height: 1.65;
    padding: 1rem 0.8rem;
    background-color: #ebebeb;
    border: 1px dashed #141414;
  }
  .content_aside:not(:last-child) {
    margin-block-end: 1rem;
  }

  .content_aside--ad {
    container: ad / inline-size;
    background-color: var(--accent-dark);
    color: var(--background-color);
    border: none;
    font-size: 1rem;
    padding: 6cqi 2cqi 4.5cqi;
    text-align: center;
    text-wrap: balance;

    & > * {
      font-size: 4cqi;
    }

    & a {
      font-size: 8cqi;
    }
  }

  :global(html.dark .content_aside--ad) {
    color: var(--accent-dark);
  }
</style>
