import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Ensures both .svelte and .md files are treated as components (can be imported and used anywhere, or used as pages)
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: ['.md'],

			// Adds IDs to headings, and anchor links to those IDs. Note: must stay in this order to work.
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
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
