<script>
  import { page } from '$app/stores';
  import Section from '$lib/components/Section.svelte';
</script>

<Section>
  <p>I'm not sure how you got here. But here's some options of where to go!</p>
  <ul>
    <li><a href="/blog">Blog home</a></li>
    <li><a href="https://zachsaucier.com">My personal site</a></li>
    <li><a href="mailto:hello@zachsaucier.com">Email me</a></li>
  </ul>

  <footer>
    <sub>
      <h2>Error info</h2>
      <p>{$page.status}: {$page.error.message}</p>
    </sub>
  </footer>
</Section>

<style>
  footer {
    margin-top: 2em;
  }
</style>
