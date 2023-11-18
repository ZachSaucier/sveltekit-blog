<script>
  import { preloadCode } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import { current_page, recent_posts } from '$lib/utilities/store';
  import { nav_items } from '$lib/config';

  import Ribbons from '$lib/components/Ribbons.svelte';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;

  let collapsed = false;
  let innerWidth = 0;
  let scrollY = 0;

  recent_posts.set(data.recent_posts);

  const transitionIn = { delay: 150, duration: 150 };
  const transitionOut = { duration: 100 };

  /**
   * Updates the global store with the current path. (Used for highlighting
   * the current page in the nav, but could be useful for other purposes.)
   **/
  $: current_page.set(data.path);

  /**
   * This pre-fetches all top-level routes on the site in the background for faster loading.
   * https://kit.svelte.dev/docs/modules#$app-navigation-preloaddata
   *
   * Any route added in src/lib/config.js will be preloaded automatically. You can add your
   * own preloadData() calls here, too.
   **/

  onMount(() => {
    const navRoutes = nav_items.map((item) => item.route);
    preloadCode(...navRoutes);
  });

  $: translateX = () => {
    if (collapsed) {
      if (innerWidth < 1199) {
        return 0;
      } else {
        return '-100%';
      }
    } else {
      if (innerWidth < 1199) {
        return '100%';
      } else {
        return 0;
      }
    }
  };
</script>

<svelte:window bind:innerWidth bind:scrollY />

<div class="outer_container" class:collapsed>
  <button
    aria-pressed={collapsed}
    on:click={() => (collapsed = !collapsed)}
    title={collapsed ? 'Open sidebar' : 'Collapse sidebar'}
    style={`transform: translateX(${translateX()}) translateY(-${Math.min(scrollY, 210)}px)`}
  >
    <span aria-hidden>{collapsed ? '«' : '»'}</span>
    <span class="sr-only">Collapse sidebar</span>
  </button>

  <Ribbons />

  <Header style="grid-area: Header;" />

  {#key data.path}
    <main id="main" tabindex="-1" in:fade={transitionIn} out:fade={transitionOut}>
      <slot />
    </main>
  {/key}

  <Sidebar style="grid-area: Aside;" />

  <Footer style="grid-area: Footer" />
</div>

<style>
  .outer_container {
    position: relative;
    max-width: 1200px;
    padding-left: 110px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'Header Header'
      'Main Aside'
      'Footer Aside';
    min-height: 100vh;

    &.collapsed {
      & button {
        left: calc(50% + 600px);
        transform: translateX(-100%);
        border-left: var(--border-sidebar);
        border-bottom-left-radius: 4px;
      }

      & main {
        transform: translateX(150px);
      }

      & aside {
        display: none;
      }

      & footer {
        transform: translateX(150px);

        & ul {
          justify-content: center;
        }
      }
    }
  }

  button {
    position: fixed;
    top: 210px;
    left: calc(50% + 300px);
    z-index: 1;
    transition: none;
    border-right: var(--border-sidebar);
    border-bottom: var(--border-sidebar);
    color: var(--grayed-text);
    background-color: var(--background-color);
    border-bottom-right-radius: 4px;

    &:hover {
      background-color: var(--accent-dark);
      color: var(--background-color);
    }
  }

  @media (max-width: 1199px) {
    .outer_container.outer_container button {
      left: auto;
      right: 300px;
    }
    .outer_container.collapsed button {
      right: 0;
    }
  }

  main {
    position: relative;
    grid-area: Main;
    padding-bottom: var(--footer-height);
  }

  @media (max-width: 999px) {
    .outer_container {
      grid-template-areas:
        'Header Header'
        'Main Main'
        'Aside Aside'
        'Footer Footer';
      overflow: hidden;
    }

    main {
      padding-bottom: 0;
    }
  }

  @media (max-width: 749px) {
    .outer_container {
      padding-left: 40px;
    }
  }
</style>
