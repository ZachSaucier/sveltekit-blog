<script>
  /**
   * @typedef {Object} Props
   * @property {string} [type]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { type = 'default', children } = $props();
</script>

<aside class="content_aside content_aside--{type}">
  {@render children?.()}
</aside>
