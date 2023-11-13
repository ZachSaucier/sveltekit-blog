---
title: Blog refresh 2023
date: 2023-11-11
tags:
  - code
  - projects
  - css
  - svelte
# cover_image: /images/PLACEHOLDER_IMAGE.jpg
# cover_width: 16
# cover_height: 9
description: A post covering some new web features that I used when recreating this blog.
---

<script>
	import TwitterEmbed from "$lib/components/TwitterEmbed.svelte";
</script>

I first created my blog in 2014. For the next ~10 years, it stayed the same, only adding new posts through 2017 when I lost the ability to easily make new posts (note: always save to the cloud). Its design has held up surprisingly well!

In the last ~1.5 years CSS-Tricks has basically died and Twitter has similarly taken a blow thanks to Elon. As a result, I have tech stuff that I want to explore and post about but not a great place to post it. In the last ~6 months I've been using Svelte a lot more and I figured now's a good time as any to rebuild my blog. (I should probably do the same thing for [my personal site](/) sometime)

In this post I'll cover some of the key changes and cool new tech that I got to use in building this blog!

<span class="excerpt_marker"></span>

## What I've been doing since 2017

In case you're interested in what I've been doing since I last posted on this blog, here's a partial lightning recap:

- I've worked fulltime for [GreenSock (GSAP)](https://gsap.com/), an agency called [Rally Interactive](https://rallyinteractive.com/), [Stripe](https://stripe.com/), and [Mailchimp](https://mailchimp.com/).
  - Here's a Twitter thread about some of the work I created at Stripe:
    <TwitterEmbed expandable="true">
      <p lang="en" dir="ltr">I was a part of the <a href="https://twitter.com/stripe?ref_src=twsrc%5Etfw">@stripe</a> 14% layoffs last week. If you&#39;d like to work with me, please DM me!<br><br>Here’s a of some of my favorite animations I contributed to during my time at Stripe (videos in thread): <a href="https://t.co/ankCaE2E1p">pic.twitter.com/ankCaE2E1p</a></p>&mdash; Zach Saucier (@ZachSaucier) <a href="https://twitter.com/ZachSaucier/status/1590027167173611521?ref_src=twsrc%5Etfw">November 8, 2022</a>
    </TwitterEmbed>
- I've freelanced for many individuals, startups, and companies including [Retool](https://retool.com/).
  - Here's a breakdown of some of the effects I made for Retool:
    <TwitterEmbed expandable="true">
      <p lang="en" dir="ltr">Here&#39;s a 🧵 overviewing the techniques I used while creating the <a href="https://twitter.com/retool?ref_src=twsrc%5Etfw">@retool</a> Visual Basic page <a href="https://t.co/RcA0yV1rkn">https://t.co/RcA0yV1rkn</a> (1/10): <a href="https://t.co/Hrajp6ED6L">pic.twitter.com/Hrajp6ED6L</a></p>&mdash; Zach Saucier (@ZachSaucier) <a href="https://twitter.com/ZachSaucier/status/1643231123361677314?ref_src=twsrc%5Etfw">April 4, 2023</a>
    </TwitterEmbed>
- I wrote a thread about my most recent interview process:
  - <TwitterEmbed expandable="true">
      <p lang="en" dir="ltr">I was laid off from <a href="https://twitter.com/stripe?ref_src=twsrc%5Etfw">@stripe</a> in November, started looking for senior front-end web developer jobs immediately, and accepted a full-time position in April.<br><br>Here&#39;s a 🧵 with some stats about my experience:<a href="https://t.co/4BAskUnHJ7">https://t.co/4BAskUnHJ7</a></p>&mdash; Zach Saucier (@ZachSaucier) <a href="https://twitter.com/ZachSaucier/status/1661716656706428928?ref_src=twsrc%5Etfw">May 25, 2023</a>
    </TwitterEmbed>
- [Just Read](https://justread.link/) reached 200,000 weekly users (now for the last ~5 years!).
- I moved to New York City.
- I celebrated my 5 year wedding anniversary!
- I made new friends, got into rock climbing, and built a lot of little projects.

Now that that's out of the way, onto the meat of this post!

## My history with frameworks

I started programming for the web when jQuery was _the tool_ to use. However, native JavaScript was quickly improving and I started using straight HTML + CSS + JS for everything that I built.

For the next several years, frameworks came and went on large scales but I never felt the need to use one for the projects I was building, which were relatively small in nature. I did use preprocessors like SCSS sometimes. And for medium sized projects I'd use either templating engines like Pug/Jade or a backend language like PHP for templating. For [the Just Read website](https://justread.link/)/server I used Node.js + Express.js which was fine but sticking close to my native roots.

I was never really drawn to any of the major frameworks. The most appealing was Vue due to its acceptance of using straight HTML + CSS + JS and just enhancing parts, but even then I didn't really like the Vue-y parts of it.

At [GreenSock](https://gsap.com/) (GSAP) we mainly used a (crappy) PHP-based CMS called Invision Power Board (now Invision Community). At ([Rally](https://rallyinteractive.com/)) we used Nunjucks for templating and Contentful as the CMS for the major projects I worked on there. At [Stripe](https://stripe.com/) we used Ruby on the backend, Liquid as the templating engine, and Contentful as the CMS.

That's not to say that I never used React or the other frameworks; I used React at GreenSock, Rally, Stripe, and multiple freelance projects. I used Angular and Vue once or twice for little things. But I never really vibed with the big hype around React and the other big frameworks.

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
- Adding section heading link click functionality
- Adding a tweet button to blog posts
- Adding blog post "draft" functionality
- Making fairly big additions to the pagination functionality
- Fixing the category (I renamed them to [tags](/blog/tags)) counts
- Making the site titles across pages more consistent
- Improving some Markdown handling to add footnotes, accessibility for emojis, and preventing widows

As a bonus, SvelteKit comes with content transitions between pages out of the box! Yay for not having to use something like Barba.js to do this.

## Cool new CSS features

Building the site from scratch also provided a time to touch up some bits, shave old CSS (bye bye browser prefixes), use a new serif font, and try out new CSS tools.

But perhaps my favorite change related to styles comes from using Svelte: components automatically [come with scoped CSS](https://svelte.dev/docs/svelte-components) to that component 😮 So you don't need CSS modules, Tailwind, or even [cascade layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers).

Of the new CSS features, using CSS nesting feels the most refreshing. Paired with using CSS variables, 99% of my use cases for CSS pre-processors are accounted for. Since this website doesn't get much traffic, I'm not even providing a fallback since it's [pretty well supported](https://caniuse.com/css-nesting).

The neatest CSS feature I used was the OKLCH color space. It made the blue used on the ribbon pop even more than before!

<img src="$lib/images/comparison.webp" alt="The old version of the blog next to the new version of the blog, showing some of the subtle updates as well as the more vibrant blue accent color" loading="lazy" width="2766" height="998" />

I've seen some weird flashes with the colors sometimes where it looks like it goes to the RGB color fallback, but that's worth the tradeoff for me on this website.

Another color feature I used for the first time [color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) to do some lightening and darkening of the CSS variables for different states. It is not bad but I wish there was something more like a true lighten/darken that used the color itself as the extreme. Some of the colors I tried got washed out a bit by the white or black that I mixed it with.

By converting my colors for the site to use CSS variables, I basically got a dark mode for free! It only took some playing around with the values to find somthing that I liked.

One of the nice-to-have features I used was query ranges for CSS media queries. It's another feature I've long-awaited since media queries were first introduced. Oh, and I used the `,` operator of media queries for the first time!

And I tried out container queries for the first time. I will write another, more in depth article about using them!

Lastly, I used some `position: sticky` on the sidebar if the viewport height is tall enough. Not super new or the first time I've used the feature but still a nice addition.

## Where my blog is going from here

I plan on writing short posts anytime that I make a little side project. I also plan on posting a few longer, more in-depth articles about some new technology. If that interests you, please make use of [the RSS feed](/blog/api/rss.xml), the email signup in the sidebar, or following me [on Twitter](https://twitter.com/ZachSaucier) or [Bluesky](https://bsky.app/profile/zachsaucier.bsky.social)!
