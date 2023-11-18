<script>
  import { recent_posts } from '$lib/utilities/store';
  import Icon from '$lib/components/Icon.svelte';

  export let style = '';

  const projects = [
    {
      title: 'Just Read',
      description: 'A customizable read mode web extension.',
      link: 'https://justread.link/',
    },
    {
      title: 'Disentegrate.js',
      description: 'Break DOM elements into animated particles.',
      link: 'https://github.com/ZachSaucier/Disintegrate',
    },
  ];

  const socials = [
    {
      title: 'TwitterCircle',
      link: 'https://twitter.com/ZachSaucier/',
    },
    {
      title: 'GitHubCircle',
      link: 'https://github.com/ZachSaucier/',
    },
    {
      title: 'CodePenCircle',
      link: 'https://codepen.io/ZachSaucier/',
    },
    {
      title: 'LinkedInCircle',
      link: 'https://www.linkedin.com/in/zach-saucier-051aa171/',
    },
    {
      title: 'StackOverflowCircle',
      link: 'https://stackoverflow.com/users/2065702/Zach-Saucier',
    },
    {
      title: 'EmailCircle',
      link: 'mailto:hello@zachsaucier.com',
    },
  ];
</script>

<aside {style}>
  <div class="aside_content">
    {#if $recent_posts.length}
      <h1>Recent posts</h1>
      <section>
        <ol>
          {#each $recent_posts as post}
            <li>
              <a href={post.slug}>
                <h2>{post.title}</h2>
              </a>
            </li>
          {/each}
        </ol>
      </section>
    {/if}

    <section>
      <h1>Blog highlights newsletter</h1>
      <div class="sidebar_content">
        <p>Get emails about the top blog posts every once in a while.</p>

        <form
          action="https://zachsaucier.us10.list-manage.com/subscribe/post?u=bb6f49ab8432b5ad1f4c97206&amp;id=e928920a6c&amp;f_id=0033dee5f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
        >
          <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="Email" value="" />
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
            <input
              type="text"
              name="b_bb6f49ab8432b5ad1f4c97206_e928920a6c"
              tabindex="-1"
              value=""
            />
          </div>
          <input type="submit" name="subscribe" id="mc-embedded-subscribe" value="Subscribe" />
        </form>
      </div>
    </section>

    <section>
      <h1>Favorite side projects</h1>
      <ul>
        {#each projects as project}
          <li>
            <a href={project.link}>
              <h2>{project.title}</h2>
            </a>
            <p>{project.description}</p>
          </li>
        {/each}
      </ul>
    </section>

    <section>
      <ul class="socials">
        {#each socials as social}
          <li>
            <a href={social.link}>
              <Icon type={social.title} width={32} />
            </a>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</aside>

<style>
  aside {
    padding: 4rem 1rem;
    border-left: var(--border-sidebar);
    border-right: var(--border-sidebar);

    @media (max-width: 1199px) {
      padding-top: 1rem;
      border-left: none;
      border-right: none;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
    }

    @media (max-width: 580px) {
      padding-bottom: 0;
    }
  }

  h1 {
    font-size: 1.2rem;
    margin-bottom: 0.4em;
    padding-bottom: 0.2em;
    border-bottom: var(--border-sidebar);
  }

  section {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  ul,
  ol,
  .sidebar_content {
    padding-inline-start: 20px;
    font-size: 0.9rem;
  }

  li {
    padding: 0.5em 0;
    border-bottom: 1px solid #ededed;
    margin-bottom: 0.4em;
  }

  form {
    margin-top: 0.3em;
  }

  .socials {
    display: flex;
    gap: 5px;
    justify-content: space-between;
    padding-inline-start: 0;

    & a {
      display: contents;
    }

    & li {
      padding: 0;
      border-bottom: 0;
      margin-bottom: 0;
    }
  }

  @media (min-height: 700px) {
    .aside_content {
      position: sticky;
      top: 35px;
    }
  }
</style>
