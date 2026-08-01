<script>
  import { page as app_page } from '$app/state';
  import { site_author, nav_items } from '$lib/config';

  /**
   * @typedef {Object} Props
   * @property {string} [style]
   */

  /** @type {Props} */
  let { style = '' } = $props();

  const current_path = $derived(app_page.url.pathname);
</script>

<footer {style}>
  <nav>
    <ul>
      <li>
        <p>&copy;{new Date().getFullYear()} {site_author}</p>
      </li>
      {#each nav_items as page (page.route)}
        {@const href = page.route}
        {@const is_current_page = current_path.startsWith(href)}
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
      <li style="display:none">
        <a href="/blog/search">Search</a>
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

    @media (max-width: 580px) {
      position: static;
    }
  }

  ul {
    display: flex;
    gap: clamp(8px, 3.1cqi, var(--nav-gap));

    @media (max-width: 580px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 1rem 2rem;
    }
  }
</style>
