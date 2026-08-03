import { sveltekit } from '@sveltejs/kit/vite';
import { Features } from 'lightningcss';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  css: {
    lightningcss: {
      // The light-dark() polyfill breaks values stored in custom properties and in
      // shorthands like border. This site uses color-scheme + native light-dark().
      exclude: Features.LightDark,
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
};

export default config;
