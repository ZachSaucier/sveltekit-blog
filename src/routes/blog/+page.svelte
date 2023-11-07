<script>
  import { title_ending, site_description, posts_per_page } from '$lib/config';
  import Section from '$lib/components/Section.svelte';
  import PostsList from '$lib/components/PostsList.svelte';
  import Pagination from '$lib/components/Pagination.svelte';

  export let data;

  const { total_posts, posts } = data;

  $: lower_bound = posts_per_page - (posts_per_page - 1) || 1;
  $: upper_bound = Math.min(posts_per_page, total_posts);
</script>

<svelte:head>
  <title>Musings{title_ending}</title>
  <meta data-key="description" name="description" content={site_description} />
</svelte:head>

<PostsList {posts} />

<Section>
  <Pagination current_page={1} path="/blog/page" {total_posts} {lower_bound} {upper_bound} />
</Section>
