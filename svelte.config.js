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
import remarkFootnotes from 'remark-footnotes';

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

      remarkPlugins: [remarkGfm, remarkFootnotes],
    }),
    importAssets(),
    preprocess(),
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        '/blog/',
        '/blog/page',
        '/blog/page/[page]/',
        '/blog/archive/',
        '/blog/tag/',
        '/blog/tags/',
        '/blog/tag/[tag]/',
        '/blog/tag/[tag]/page/',
        '/blog/tag/[tag]/page/[page]/',
        '/blog/api/posts.json/',
        '/blog/api/posts_for_tags.json/',
        '/blog/api/posts/count/',
        '/blog/api/posts/page/[page]/',
        '/blog/api/rss.xml/',
      ],
    },
  },
};

export default config;
