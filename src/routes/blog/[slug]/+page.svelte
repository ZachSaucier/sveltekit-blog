<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
  import { onMount } from 'svelte';
  import { title_ending } from '$lib/config';
  import Section from '$lib/components/Section.svelte';
  import Date from '$lib/components/Date.svelte';
  import BlueskyShare from '$lib/components/BlueskyShare.svelte';

  let { data } = $props();

  let url = $state('');
  onMount(() => (url = window.location.href));

  const title = $derived(data.meta.title);
  const description = $derived(data.meta.description);
  const date = $derived(data.meta.date);
  const updated = $derived(data.meta.updated);
  const cover_image = $derived(data.meta.cover_image);
  const cover_width = $derived(data.meta.cover_width);
  const cover_height = $derived(data.meta.cover_height);
  const cover_alt = $derived(data.meta.cover_alt);
  const cover_in_post = $derived(data.meta.cover_in_post);
  const tags = $derived(data.meta.tags);
  const relatedPosts = $derived(data.relatedPosts);

  // Eagerly import post modules so embedded Svelte components hydrate on the client.
  const modules = import.meta.glob('/src/lib/posts/**/*.md', { eager: true });
  const postModule = $derived(modules[`/src/lib/posts/${data.meta.year}/${data.meta.slug}.md`]);
  const Post = $derived(postModule?.default ?? null);
</script>

<svelte:head>
  <title>{title}{title_ending}</title>
  <meta data-key="description" name="description" content={description} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="twitter:description" content={description} />
  {#if cover_image}
    <meta property="og:image" content={cover_image} />
    <meta property="og:image:width" content={cover_width} />
    <meta property="og:image:height" content={cover_height} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={cover_image} />
    <meta name="twitter:image:alt" content={cover_alt} />
  {/if}
  {#if data.documentAtUri}
    <link rel="site.standard.document" href={data.documentAtUri} />
  {/if}
</svelte:head>

<Section searchable={true}>
  <header class="post_header">
    <h2 class="post_title">
      {title}
    </h2>

    <Date input_date={date} {updated} />
  </header>

  <article>
    {#if cover_image && !!cover_in_post}
      <img
        src={cover_image}
        alt={cover_alt}
        width={cover_width}
        height={cover_height}
        style="aspect-ratio: {cover_width} / {cover_height}"
      />
    {/if}
    {#if Post}
      <Post />
    {/if}
  </article>

  {#if tags}
    <aside>
      <div class="tags">
        <h2>Tags:</h2>
        <ul>
          {#each tags as tag}
            <li>
              <a href="/blog/tag/{tag}/">
                {tag}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </aside>
  {/if}

  {#if relatedPosts && relatedPosts.length > 0}
    <aside class="related_posts">
      <h2>Related posts</h2>
      <ul>
        {#each relatedPosts as post}
          <li>
            <a href="/blog/{post.slug}/">
              {post.title}
            </a>
          </li>
        {/each}
      </ul>
    </aside>
  {/if}

  <aside>
    <p>Like this post?</p>
    <div class="like_share_buttons">
      <BlueskyShare {url} />
      <a href="https://www.buymeacoffee.com/zachsaucier" target="_blank">
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png"
          alt="Buy Me A Coffee"
          style="height: 60px !important;width: 217px !important;"
        />
      </a>
    </div>
  </aside>
</Section>

<style>
  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 2rem 0 0;
  }

  .tags {
    --gap: 0.6ex;
    display: flex;
    gap: var(--gap);
    margin-top: 3rem;

    & h2 {
      font-family: inherit;
      line-height: inherit;
      white-space: nowrap;
    }

    & h2,
    & li {
      margin: 0;
    }

    & ul {
      display: flex;
      gap: var(--gap);
      flex-wrap: wrap;
      list-style: none;
    }

    & li {
      white-space: nowrap;
    }

    & li:not(:last-child)::after {
      content: ', ';
    }
  }

  .like_share_buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .related_posts {
    & ul {
      list-style: disc;
      padding-left: 1em;
    }
  }
</style>
