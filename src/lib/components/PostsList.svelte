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
            {#if post.cover_image}
              <a href={path} rel="full-article">
                <img
                  src={post.cover_image}
                  alt=""
                  width={post.cover_width}
                  height={post.cover_height}
                  style="ratio: {post.cover_width} / {post.cover_height}"
                />
              </a>
            {/if}

            <a href={path} rel="full-article">
              <h2 class="post_title">
                {post.title}
              </h2>
            </a>

            <Date input_date={post.date} />
          </header>

          <article>
            {@html post.excerpt}
          </article>

          {#if !post.has_excerpt}
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
  a {
    color: inherit;
  }

  footer {
    margin-top: 1em;
  }

  .read_on {
    display: inline-block;
    padding: 0.4em 0.8em;
    margin-right: 0.5em;
    margin-top: 1rem;
    text-decoration: none;

    &::after {
      content: '\2192';
      display: inline-block;
      transform: translateX(4px);
      transition: 0.15s;
    }

    &:hover::after {
      transform: translateX(6px);
    }
  }
</style>
