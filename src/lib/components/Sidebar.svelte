<script>
  import { email_list_id } from '$lib/config';
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

    <!-- {#if email_list_id}
			<section>
				<h1>Blog highlights newsletter</h1>
				<div class="sidebar_content">
					<p>Get email notifications for the top blog posts every once in a while.</p>
					<form
						method="POST"
						action="//manage.kmail-lists.com/subscriptions/subscribe"
						novalidate="novalidate"
					>
						<input type="hidden" name="g" value={email_list_id} />
						<input type="email" value="" id="k_id_email" placeholder="Your email" />
						<button type="submit">Subscribe</button>
					</form>
				</div>
			</section>
		{/if} -->

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
    --border: 1px solid #ededed;
    padding: 20px;
    border-left: var(--border);
    border-right: var(--border);
  }

  h1 {
    font-size: 1.2rem;
    margin: 1.5em 0 0.4em;
    padding-bottom: 0.2em;
    border-bottom: var(--border);
  }

  section:not(:last-child) {
    margin-bottom: 15px;
  }

  p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  ul,
  ol
  /* ,
  .sidebar_content */ {
    padding-inline-start: 20px;
    font-size: 0.9rem;
  }

  li {
    padding: 0.5em 0;
    border-bottom: 1px solid #ededed;
    margin-bottom: 0.4em;
  }

  /* form {
    margin-top: 0.3em;
  } */

  .socials {
    display: flex;
    gap: 5px;
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

  @media (max-width: 999px) {
    aside {
      padding: 0 var(--content-gutter) var(--footer-height);
    }
  }

  @media (min-height: 700px) {
    .aside_content {
      position: sticky;
      top: 20px;
    }
  }
</style>
