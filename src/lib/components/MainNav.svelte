<script>
  import { current_page } from '$lib/utilities/store';
  import { nav_items } from '$lib/config';
  import Icon from '$lib/components/Icon.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<nav>
  <ul>
    {#each nav_items as page}
      {@const href = page.route}
      {@const is_current_page = $current_page.startsWith(href)}
      <li>
        <a {href} class:active={is_current_page} aria-current={is_current_page ? 'page' : false}>
          {page.title}
        </a>
      </li>
    {/each}
    <li class="search_item">
      <search>
        <form action="https://www.google.com/search" method="get">
          <fieldset>
            <input type="hidden" name="q" value="site:zachsaucier.com/blog" />
            <input type="search" name="q" results="0" placeholder="Search" />
          </fieldset>
        </form>
      </search>
    </li>
    <li class="theme_toggle_item">
      <ThemeToggle />
    </li>
    <li>
      <a class="rss_link" href="/blog/api/rss.xml" data-sveltekit-reload>
        <Icon type="RSS Feed" width={29} fill="var(--background-color)" />
      </a>
    </li>
  </ul>
</nav>

<style>
  ::selection {
    background-color: var(--accent-dark);
    color: var(--background-color);
  }

  nav {
    font-size: 18px;
  }

  [type='search'] {
    padding: 5px;
    border-radius: 100px;
    border: none;
  }

  :global(html.dark [type='search']) {
    border: 1px solid var(--background-color);
  }

  ul {
    height: 80px;
    display: flex;
    gap: var(--nav-gap);
    align-items: center;
    justify-content: right;
  }

  .search_item {
    margin-right: -10px;
  }

  .theme_toggle_item {
    margin-right: -5px;
  }

  a {
    color: var(--background-color);
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }

  .rss_link {
    display: flex;
  }

  @media (max-width: 749px) {
    nav {
      font-size: 16px;
      margin-bottom: 4px;
    }

    ul {
      height: auto;
    }

    [type='search'] {
      width: 55px;
    }
  }
</style>
