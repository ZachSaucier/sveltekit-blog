<script>
  export let input_date;
  export let updated = false;
  export let short = false;
  export let style = false;

  const date = new Date(input_date);
  const date_string =
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
        });

  const updated_date = new Date(updated);
  const updated_string =
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
        });
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
