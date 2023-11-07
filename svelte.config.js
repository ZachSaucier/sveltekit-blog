import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { importAssets } from 'svelte-preprocess-import-assets';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeWidont from 'rehype-widont';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			// This overrides the default mdsvex extension of .svx
			extensions: ['.md'],

			// Note: Order matters
			rehypePlugins: [
				rehypeSlug,
				[
					rehypeAutolinkHeadings,
					{
						behavior: 'wrap',
						properties: {
							className: ['section_heading']
						}
					}
				],
				rehypeToc,
				rehypeAccessibleEmojis,
				rehypeWidont
			],

			remarkPlugins: [remarkGfm]
		}),
		importAssets(),
		preprocess()
	],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'/blog',
				'/blog/*',
				'/blog/api/posts/page/*',
				'/blog/tag/',
				'/blog/tag/*',
				'/blog/tag/*/page/*'
			]
		}
	}
};

export default config;
