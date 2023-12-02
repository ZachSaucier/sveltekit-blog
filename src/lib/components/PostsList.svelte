<script>
  import Section from '$lib/components/Section.svelte';
  import Date from '$lib/components/Date.svelte';
  export let posts = [];
</script>

<div class="posts_list">
  <ul>
    {#each posts as post}
      {@const path = `/blog/${post.slug}`}
      <li>
        <Section>
          <header class="post_header">
            <a class="post_title" href={path} rel="full-article">
              <h2 class="post_title">
                {post.title}
              </h2>
            </a>

            <Date input_date={post.date} />
          </header>

          <article>
            {@html post.excerpt ? post.excerpt : post.full_post}
          </article>

          {#if post.excerpt}
            <footer>
              <a href={path} class="read_on" rel="full-article">Read on</a>
            </footer>
          {/if}
        </Section>
      </li>
    {/each}
  </ul>
</div>

<style>
  .post_title {
    color: inherit;
  }

  footer {
    margin-block-start: 1em;
  }

  .read_on {
    display: inline-block;
    padding: 0.4em 0.8em;
    margin-inline-end: 0.5em;
    margin-block-start: 1rem;
    text-decoration: none;

    &::after {
      content: '\2192';
      display: inline-block;
      transform: translateX(4px);
      transition: 0.15s;
    }

    &:is(:hover, :focus)::after {
      transform: translateX(6px);
    }
  }
</style>
