<script>
	import Icon from '$lib/components/Icon.svelte';
	import { recentPosts } from '$lib/utilities/store';

	export let style = '';

	const projects = [
		{
			title: 'Just Read',
			description: 'A customizable read mode web extension.',
			link: 'https://justread.link/'
		},
		{
			title: 'Disentegrate.js',
			description: 'Break DOM elements into animated particles.',
			link: 'https://github.com/ZachSaucier/Disintegrate'
		}
	];

	const socials = [
		{
			title: 'Twitter',
			link: 'https://twitter.com/ZachSaucier/'
		},
		{
			title: 'GitHub',
			link: 'https://github.com/ZachSaucier/'
		},
		{
			title: 'CodePen',
			link: 'https://codepen.io/ZachSaucier/'
		},
		{
			title: 'LinkedIn',
			link: 'https://www.linkedin.com/in/zach-saucier-051aa171/'
		},
		{
			title: 'StackOverflow',
			link: 'https://stackoverflow.com/users/2065702/Zach-Saucier'
		},
		{
			title: 'Email',
			link: 'mailto:hello@zachsaucier.com'
		}
	];
</script>

<aside {style}>
	<section>
		<h1>About me</h1>
		<p>
			Welcome to my blog! I'm a product, design, and animation minded engineer.<br />I love creating
			useful tools as much as I do new animation techniques.
		</p>
	</section>

	{#if $recentPosts.length}
		<h1>Recent posts</h1>
		<section>
			<ol>
				{#each $recentPosts as post}
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
</aside>

<style>
	aside {
		--border: 1px solid #ededed;
		padding: 20px;
		border: var(--border);
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
		font-size: 0.9rem;
		line-height: 1.6;
	}

	ul,
	ol {
		padding-inline-start: 20px;
		font-size: 0.9rem;
	}

	li {
		padding: 0.5em 0;
		border-bottom: 1px solid #ededed;
		margin-bottom: 0.4em;
	}

	.socials {
		display: flex;
		gap: 5px;

		& a {
			display: contents;
		}

		& li {
			padding: 0;
			border-bottom: 0;
			margin-bottom: 0;
		}
	}
</style>
