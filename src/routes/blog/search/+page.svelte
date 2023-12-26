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
</style>
