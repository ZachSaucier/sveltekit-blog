<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { PagefindUI } from '@pagefind/default-ui';
  import '@pagefind/default-ui/css/ui.css';
  import { title_ending } from '$lib/config';
  import Section from '$lib/components/Section.svelte';

  onMount(() => {
    const pagefind = new PagefindUI({
      element: '#search',
      showSubResults: true,
      showImages: false,
      showEmptyFilters: false,
      autofocus: true,
    });
    pagefind.triggerSearch($page.url.searchParams.get('q'));
    const search_input = document.querySelector('#search input');
    search_input.addEventListener('input', (e) => {
      const search_params = new URLSearchParams(window.location.search);
      search_params.set('q', e.target.value);
      const new_url = `${window.location.pathname}?${search_params.toString()}`;
      history.pushState(null, '', new_url);
    });
  });
</script>

<svelte:head>
  <title>Search{title_ending}</title>
</svelte:head>

<Section>
  <div id="search" />
</Section>

<style>
  #search {
    --pagefind-ui-font: var(--font-sans-serif);
    --pagefind-ui-primary: var(--link-color);
    --pagefind-ui-text: var(--accent-dark);
    --pagefind-ui-background: var(--background-color);
    --pagefind-ui-border: var(--border-dashed-color);
    --pagefind-ui-tag: var(--border-dashed-color);
  }

  :global(.pagefind-ui__result, .pagefind-ui__message) {
    background: var(--border-dashed) !important;
    border-top: none !important;
    border-bottom: none !important;
  }

  :global(.pagefind-ui__button) {
    --pagefind-ui-background: var(--button-background) !important;
    --pagefind-ui-primary: var(--button-color) !important;
    --pagefind-ui-border-radius: 0px !important;
    border: none !important;
    transition: 0.15s;
  }
  :global(.pagefind-ui__button:hover) {
    --pagefind-ui-background: var(--button-background-hover) !important;
  }

  :global(.pagefind-ui__result-nested .pagefind-ui__result-link::before) {
    top: -2px !important;
  }
</style>
