<script>
  import { goto } from '$app/navigation';
  import { current_page } from '$lib/utilities/store';
  import { nav_items } from '$lib/config';
  import Icon from '$lib/components/Icon.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  function handleSearchSubmit(e) {
    const form_data = new FormData(e.target);
    let search_query = form_data.get('search');
    search_query = search_query.trim();
    if (search_query.length < 1) return;
    else return goto(`/blog/search?q=${search_query}`);
  }
</script>

<nav>
  <ul>
    {#each nav_items as page}
      {@const href = page.route}
      {@const is_current_page = $current_page.startsWith(href)}
      <li>
        <a
          {href}
          class="nav_link"
          class:active={is_current_page}
          aria-current={is_current_page ? 'page' : false}
        >
          {page.title}
        </a>
      </li>
    {/each}
    <li class="search_item">
      <search>
        <form on:submit|preventDefault={handleSearchSubmit}>
          <input type="search" name="search" results="0" placeholder="Search" />
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
    background-color: var(--text-color);
    color: var(--background-color);
  }

  .nav_link {
    color: var(--background-color);
    text-decoration: none;
  }

  a:is(:hover, :focus) {
    text-decoration: underline;
  }

  nav {
    font-size: 18px;

    @media (max-width: 749px) {
      font-size: 16px;
      margin-block-end: 4px;
    }
  }

  ul {
    height: 80px;
    display: flex;
    gap: var(--nav-gap);
    align-items: center;
    justify-content: right;

    @media (max-width: 749px) {
      height: auto;
    }
  }

  .search_item {
    margin-inline-end: -10px;

    @media (max-width: 416px) {
      display: none;
    }
  }

  [type='search'] {
    padding: 5px;
    border-radius: 100px;
    border: light-dark(none, 1px solid var(--background-color));

    @media (max-width: 749px) {
      width: 55px;
    }

    &::placeholder {
      overflow: visible;
    }
  }

  .theme_toggle_item {
    margin-inline-end: -5px;
  }

  .rss_link {
    display: flex;
  }
</style>
