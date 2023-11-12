<script>
  import { current_page } from '$lib/utilities/store';
  import { site_author, nav_items } from '$lib/config';

  export let style = '';
</script>

<footer {style}>
  <nav>
    <ul>
      <li>
        <p>&copy;{new Date().getFullYear()} {site_author}</p>
      </li>
      {#each nav_items as page}
        {@const href = page.route}
        {@const is_current_page = $current_page.startsWith(href)}
        <li>
          <a {href} class:active={is_current_page} aria-current={is_current_page ? 'page' : false}>
            {page.title}
          </a>
        </li>
      {/each}
      <li>
        <a href="/blog/api/rss.xml" data-sveltekit-reload>RSS</a>
      </li>
      <li>
        <a href="/blog/archive">Archive</a>
      </li>
      <li>
        <a href="/blog/tags">Tags</a>
      </li>
    </ul>
  </nav>
</footer>

<style>
  footer {
    container: footer / inline-size;
    position: absolute;
    bottom: 25px;
    left: var(--content-gutter);
    right: var(--content-gutter);
    white-space: nowrap;
  }

  ul {
    display: flex;
    gap: clamp(8px, 3.1cqi, var(--nav-gap));
  }
</style>
