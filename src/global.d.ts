/// <reference types="@sveltejs/kit" />

declare module 'svelte/elements' {
  export interface SvelteHTMLElements {
    'bsky-comments': HTMLAttributes<HTMLElement> & {
      post?: string;
      uri?: string;
      sort?: string;
      service?: string;
      'icon-like'?: string;
      'icon-reply'?: string;
    };
  }
}

export {};
