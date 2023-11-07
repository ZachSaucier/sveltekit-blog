---
title: Blog refresh 2023
date: 2023-11-05
tags:
  - code
  - projects
  - css
  - svelte
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description:
draft: true
---

I first created my blog in 2014. For the next ~10 years, it stayed the same, only adding new posts through 2017 when I lost the ability to easily make new posts (note: always save to the cloud). Its design has held up surprisingly well!

In the last ~1.5 years CSS-Tricks has basically died and Twitter has similarly taken a blow thanks to Elon. As a result, I have tech stuff that I want to explore and post about but not a great place to post it. In the last ~6 months I've been using Svelte a lot more and I figured now's a good time as any to rebuild my blog.

In this post I'll cover some of the key changes and cool new tech that I got to use in building this blog!

<span class="excerpt-marker"></span>

## My history with frameworks

I started programming for the web when jQuery was _the tool_ to use. However, native JavaScript was quickly improving and I started using straight HTML + CSS + JS for everything that I built.

For the next several years, frameworks came and went on large scales but I never felt the need to use one for the projects I was building, which were relatively small in nature. I did use preprocessors like SCSS sometimes. And for medium sized projects I'd use either templating engines like Pug/Jade or a backend language like PHP for templating. For [the Just Read website](https://justread.link/)/server I used Node.js + Express.js which was fine but sticking close to my native roots.

I never was really drawn to any of the major frameworks. The most appealing was Vue due to its acceptance of using straight HTML + CSS + JS and just enhancing parts, but even then I didn't really like the Vue-y parts of it.

At [GreenSock](https://gsap.com/) we mainly used a (crappy) PHP-based CMS called Invision Power Board (now Invision Community). At ([Rally](https://rallyinteractive.com/)) we used Nunjucks for templating and Contentful as the CMS for the major projects I worked on there. At [Stripe](https://stripe.com/) we used Ruby on the backend, Liquid as the templating engine, and Contentful as the CMS.

That's not to say that I never used React or the other frameworks; I used React at GreenSock, Rally, Stripe, and multiple freelance projects. I used Angular and Vue once or twice for little things. But I never really vibed with the big hype around React and frameworks like it.

## Svelte is great!

Around 2020, I started hearing more about Svelte, Solid.js and other tools like it — what I consider the modern era of frameworks. However, due to my full time job and hobbies that didn't involve front-end web frameworks, I didn't really give them a try.

When I was laid off by Stripe in late 2022, that suddenly changed: I had time to not only play with cool new tools like [Rive](https://rive.app/) and [Spline](https://spline.design/) but also to learn about Svelte and Solid.js! I also did freelance work that got me exposed to a wider variety of tools.

So far I've used Svelte for 3 medium-sized projects. It's been lovely! There's been very few Svelte-isms that have felt weird/bad and there's always been a good reason for why they are what they are if you dive into the GitHub issues. Compared to React where it's a completely different mental modal (`useContext` and all of the other hooks are rough to learn and use), I am thrilled.

In particular, Svelte's way of handling data storage (called [stores](https://svelte.dev/docs/svelte-store) in Svelte) has been a breath of fresh air after getting familiar with it. You want to be notified when a variable changes in a different component that's in a completely different component tree? No problem.

## Building this blog

Going back to the subject of this blog, I built it from scratch using Svelte + SvelteKit. I originally started by forking Josh Collinsworth's [sveltekit-blog-starter](https://github.com/josh-collinsworth/sveltekit-blog-starter) but ended up changing how most all of it works. Those changes included:

- Moving the blog off of the top-level directory to `/blog` so that I can keep my personal website independent
- Adding handling for nested directories of blog posts (2014, 2015, etc.) to better organize entries on the backend while keeping the same `/blog/[post]` URL format
- Adding recent posts functionality
- Adding excerpt functionality
- Adding the [archive](/blog/archive) functionality
- Adding the search functionality
- Adding a table of contents to blog posts
- Adding section link click functionality
- Adding a tweet button to blog posts
- Adding blog post "draft" functionality
- Making fairly big additions to the pagination functionality
- Fixing the category (I renamed them to [tags](/blog/tags)) counts
- Making the site titles across pages more consistent
- Improving some Markdown handling to add footnotes, accessibility for emojis, and preventing widows

As a bonus, SvelteKit comes with content transitions between pages out of the box! Yay for not having to use something like Barba.js to do this.

## Cool new CSS features

Building the site from scratch also provided a time to touch up some bits, shave a lot of CSS (bye bye browser prefixes), and try out new CSS tools.

Perhaps my favorite change related to styles comes from using Svelte: components automatically [come with scoped CSS](https://svelte.dev/docs/svelte-components) to that component 😮 So you don't need CSS modules, Tailwind, or even [cascade layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers).

- nested selectors
- mix-color
- oklch
- dark theme with CSS variables
- Media query range, logical or (,)
- Sticky aside

## Where my blog is going from here

I plan on writing short posts anytime that I make a little side project. I also plan on posting a few longer, more in-depth articles about some new technology. If that interests you, please make use of [the RSS feed](/blog/api/rss.xml), the email signup in the sidebar, or following me [on Twitter](https://twitter.com/ZachSaucier) or [Bluesky](https://bsky.app/profile/zachsaucier.bsky.social)!
