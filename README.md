# A Sveltekit blog by Zach Saucier

This blog started as a fork of Josh Collinsworth's [Sveltekit static blog starter](https://github.com/josh-collinsworth/sveltekit-blog-starter). It grew to encompass many more features and does things a bit differently.

## [Demo](https://zachsaucier.com/blog/)

## Features

- **It lives under `/blog`** instead of the top level so you can keep your main website separate.
- **Static site generation with hydration.** Every route is compiled down to static HTML and routed with (optional) JavaScript, thanks to the SvelteKit static adapter.
- **Markdown support** with GitHub Flavored Markdown (GFM).
- **Styles per component** along with a single global stylesheet for general styles (mostly article content styles). With CSS variables and CSS nesting, there's no need for SASS!
- **mdvsex support** so you can use Svelte components in your Markdown files!
- **Automatic page transitions.**
- **Responsive and accessible defaults** including a "skip to content" link, accessible navigation and components, and accessible emojis.
- **Basic SEO** for blog posts.
- **RSS feed** for users to easily subscribe to new posts.
- **Draft blog post functionality** so you can save to the same place but not have the link show up in your listings or counts.
- **Footnotes functionality**
- **Blog excerpt functionality** so that you can show the start of your blog posts on the blog homepage instead of the description.
- **Tags (categories) functionality** which make looking for specific types of posts easy.
- **Advanced pagination** where only the nearest 5 pages are shown along with "first" and "last" page buttons when applicable.
- **Support for year sub-directories within posts.** This makes organizing your posts much more pleasant. You could easily add the year to the URL if you'd like.
- **Recent posts functionality** if you want to show the last X recent posts.
- **Archive functionality** which is similar to the blog listing but only shows the title and tags with a different layout that focuses on the year it was published. [Demo](https://zachsaucier.com/blog/archive/).
- **Collapsible sidebar**.
- **Tweet and CodePen embeds**.
- **Image lightboxing functionality** with built in image serving for high DPI devices.
- **High quality search functionality** using [Pagefind](https://pagefind.app/).
- **Clickable section headings** to make sharing to a particular part of a post a breeze.
- **Table of contents for blog posts** that outlines the sections of each page.
- **Tweet button** to let users more easily share to Twitter (X).
- **Automatic widow prevention** to make your blocks of text look better.
- **Email signup functionality.** It makes use of Mailchimp, but you could easily switch out the email provider for another of your choice.

## Getting started

I recommend forking this repo and then cloning it from there so that your changes are independent of the ones I will make in the future.

Use `npm run dev` to get it running locally.

In order to get the search functionality working locally, you must build the project using `npm run build`. If you want the search content to update, you need to rebuild the project.

## Documentation

Good sources for docs are:

- [The Sveltekit blog starter kit README](https://github.com/josh-collinsworth/sveltekit-blog-starter) that this project was forked from
- [The Svelte docs](https://kit.svelte.dev/docs)

## Getting help

You're free to create an issue on this repo and if I have the time I am likely to respond. But no promises!
