<script>
  let { type = 'default', children } = $props();
</script>

<aside class="content_aside content_aside--{type}">
  {@render children()}
</aside>
