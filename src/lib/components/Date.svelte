<script>
  /**
   * @typedef {Object} Props
   * @property {any} input_date
   * @property {boolean} [updated]
   * @property {boolean} [short]
   * @property {boolean} [style]
   */

  /** @type {Props} */
  let { input_date, updated = false, short = false, style = false } = $props();

  const date = $derived(new Date(input_date));
  const date_string = $derived(
    short || date.getFullYear() === new Date().getFullYear()
      ? date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        }),
  );

  const updated_date = $derived(new Date(updated));
  const updated_string = $derived(
    short || updated_date.getFullYear() === new Date().getFullYear()
      ? updated_date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        })
      : updated_date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC',
        }),
  );
</script>

<time datetime={updated ? updated_string : date_string} {style}>
  {date_string}{#if updated}, updated {updated_string}{/if}
</time>

<style>
  time {
    font-family: 'PT Sans', 'Helvetica Neue', Arial, sans-serif;
    color: var(--grayed-text);
    position: absolute;
    top: 0;
    text-transform: uppercase;
  }
</style>
