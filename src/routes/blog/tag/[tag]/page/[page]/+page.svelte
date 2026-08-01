<!-- Same things (except page title) as src/routes/blog/tag/[tag]/+page.svelte -->
<script>
  import { title_ending, site_description, tags_per_page } from '$lib/config';
  import Section from '$lib/components/Section.svelte';
  import TagPostsList from '$lib/components/TagPostsList.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  let { data } = $props();
  const page = $derived(data.page);
  const tag = $derived(data.tag);
  const total_posts = $derived(data.total_posts);
  const posts = $derived(data.posts);

  let lower_bound = $derived(page * tags_per_page - (tags_per_page - 1) || 1);
  let upper_bound = $derived(Math.min(page * tags_per_page, total_posts));

  let path = $derived(`/blog/tag/${tag}/page`);
</script>

<svelte:head>
  <title>Tag: {tag} - page {page}{title_ending}</title>
  <meta data-key="description" name={site_description} />
</svelte:head>

{#if posts && posts.length}
  <TagPostsList {posts} {tag}>
    <Pagination
      is_tag_pagination={true}
      current_page={page}
      {path}
      {total_posts}
      {lower_bound}
      {upper_bound}
    />
  </TagPostsList>

  <Section>
    <Pagination
      is_tag_pagination={true}
      current_page={page}
      {path}
      {total_posts}
      {lower_bound}
      {upper_bound}
    />
  </Section>
{:else}
  <Section>
    <h1>Oops!</h1>

    <p>Sorry, no posts to show here.</p>

    <a href="/blog">Back to blog</a>
  </Section>
{/if}
