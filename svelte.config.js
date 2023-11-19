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
              className: ['section_heading'],
            },
          },
        ],
        [
          rehypeToc,
          {
            customizeTOC: (toc) => {
              if (toc.children[0].children.length > 0) {
                const secondary_list = toc.children[0].children[0].children[1]?.children || [];
                // Strip subheadings that start with "NUM. "
                secondary_list.forEach((li) => {
                  const text = li.children[0].children[0];
                  text.value = text.value.replace(/^\d\.\s*/g, '');
                });
                return toc;
              }
              return false;
            },
          },
        ],
        rehypeAccessibleEmojis,
        rehypeWidont,
      ],

      remarkPlugins: [remarkGfm],
    }),
    importAssets(),
    preprocess(),
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        '/blog',
        '/blog/*',
        '/blog/page/*',
        '/blog/archive',
        '/blog/api/rss.xml',
        '/blog/tags/',
        '/blog/tag/*',
        '/blog/tag/*/page/*',
        '/blog/api/posts/page/*',
      ],
    },
  },
};

export default config;
