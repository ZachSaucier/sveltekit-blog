<script>
	import Icon from '$lib/Icon.svelte';

	const projects = [
		{
			title: 'Just Read',
			description: 'A customizable read mode web extension.',
			link: 'https://justread.link/'
		}
	];

	const socials = [
		{
			title: 'Twitter',
			link: 'https://twitter.com/ZachSaucier/'
		},
		{
			title: 'GitHub',
			link: 'http://github.com/ZachSaucier/'
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
			link: 'hello@zachsaucier.com'
		}
	];
</script>

<aside>
	<!-- TODO recent posts -->

	<section>
		<h1>Major side projects</h1>
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
		<h1>Socials</h1>
		<ul>
			{#each socials as social}
				<li>
					<a href={social.link}>
						<Icon type={social.title} />
					</a>
				</li>
			{/each}
		</ul>
	</section>
</aside>

<style>
	aside {
		margin-bottom: 15px;
		padding: 10px;
		background: #fafafa;
		border: 1px dashed #141414;
	}
	aside ul {
		margin: 0;
		font-size: 13px;
		line-height: 1.65;
	}
</style>
