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
  <meta name="description" content={site_description} />
  <meta property="og:site_name" content={site_description} />

  <meta
    property="og:image"
    content="https://res.cloudinary.com/desumhldo/image/upload/v1700621534/blog_ybcr0n.webp"
  />
  <meta property="og:image:width" content="1600" />
  <meta property="og:image:height" content="864" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:image"
    content="https://res.cloudinary.com/desumhldo/image/upload/v1700621534/blog_ybcr0n.webp"
  />
  <meta name="twitter:image:alt" content="A preview of Zach Saucier's blog" />
</svelte:head>

<PostsList {posts} />

<Section>
  <Pagination current_page={1} path="/blog/page" {total_posts} {lower_bound} {upper_bound} />
</Section>
