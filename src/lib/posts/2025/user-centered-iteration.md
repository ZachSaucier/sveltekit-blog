---
title: User-centered iteration
date: 2025-01-21
description: My thoughts around how caring, iterating and not striving for perfection leads to great results.
tags:
  - rambling
  - projects
  - products
  - design
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1736996846/focus_vgy19d.jpg
cover_width: 1080
cover_height: 1071
cover_alt: A comic split into four screens, each showing two dinosaurs. In the first there's a title of "brain" and a the first dinosaur says "focus on what's important." In the second the title says "depression" and the first dinosaur says "nothing is important." In the third the title says "anxiety" and the dinosaur says "everything is important". In the fourth the title says ADHD and the dinosaur says "what is focus?".
cover_in_post: true
---

## Iteration > from scratch

I'm increasingly convinced that it's usually a bad decision to start from scratch.

There are a lot of reasons behind this belief, but the primary one for me is: Usually the old way is doing pretty well. Rather than risk losing what is already going well in a full redesign, it's usually better to focus on improving what's lacking. Secondly, starting from _something_ causes one to avoid the blank page syndrome.

This rule of thumb applies to product-level thinking all the way down to code implementation itself. Following this rule of thumb and avoiding redesigns may make you much more efficient and able to ship more.

<span class="excerpt_marker"></span>

## When to "start fresh"

Are there any cases when one should do a from-scratch redesign instead of iterating?

It can make sense to do so when the goals are very much not being achieved with the current version.

Even still, if you are creating a version "from scratch" I think that it makes a _lot_ of sense to first outline what is going well with the current version and use those principles when creating a new version. So it's still not truly "from scratch" (as Kirby Ferguson would say, [everything is a remix](https://www.youtube.com/watch?v=X9RYuvPCQUA) — though I don't agree with everything in this video).

## The trick: Doing user-focused, goal-driven work

Having user-focused goals and keeping them at the forefront of your mind is the key to avoiding redesigns and making iterative improvements.

I think where many people and companies go wrong is by focusing on business-goals rather than user-focused goals. It's easy to slip into a business-focused mindset, especially if the business primarily uses metrics for decision making (metrics don't lie, right??). I think a better balance can be achieved by combining metrics with a product mindset, dogfooding your own product, and talking to users.

It's also easy to slip into working without a goal or having a half-baked goal. If you don't know exactly why you're doing something, take a step back and think about it. You might find you shouldn't be doing what you're doing at all.

Who are your users? What are their needs? How does the current product solve their needs and where does it fall short?

By acting on user-focused goals most of the time, you'll not only be more efficient but also create a better product.

## How this has played out in my personal projects

Let's take a look at how this rule of thumb has helped me make achieve quality results in my personal time.

### Drawing

I'm pretty terrible at drawing. I remember when I was growing up I felt like I had to get everything right the first time or throw it away and restart.

Take drawing a straight line for example. I, like most people, have a hard time drawing a long, perfectly straight line, especially without a tool.

One day I saw someone draw a straight line not in one single motion but through a bunch of small straight lines. It's much easier to draw straight lines that are short that it is to draw long ones. It also allows you to "correct" previous lines by adjusting for where you're going in the wrong direction. Yes, it's not the _exact_ same outcome of a straight line drawn in one motion. But it avoids significant downsides and also is a lot less stressful for me.

Learning to sketch first then iterate greatly improved my drawing, which also freed me to draw more, creating a cycle of improvement.

### My personal website

I [first](https://web.archive.org/web/20131004134705/http://zachsaucier.com/) created a personal website for my professional portfolio in 2013. Its simple design holds up pretty well! Between 2013 and 2017 I made [minor updates to it](https://web.archive.org/web/20161007032655/http://zachsaucier.com/) when I had something to add or improve.

In 2017 I sought to redesign my personal website completely. I wanted something more technically impressive that would stick out to potential employers. I played around with a few ideas but ultimately ended up with [this version](https://web.archive.org/web/20171005053121/https://zachsaucier.com/) and [wrote about the process](/blog/site-redesign-2017/). I think it mostly achieved my goals!

Since that time my design and front-end skills have increased significantly. Throughout the years I have played around with multiple redesigns of my personal site with very different styles. They included a version with a 3D room with a digital avatar, a 2D story-driven version, a version with a different color scheme and type of interactive visual per section, and a generic "award-looking" version that breaks down and shows a more playful version underneath. Each time I had an idea I started making progress on the idea, but never saw it to completion because I wasn't convinced the end experience would be worth switching to for one reason or another.

At the end of 2024 I finally decided to _not_ attempt a full design of my website but instead focus on the aspects that I thought should be improved, namely:

1. The projects were outdated
2. The visual style was a little dated
3. Some of the code implementation was a bit outdated, which made updating it a little harder than I wanted it to be

Wouldn't ya know it, after a few days of cleaning up the old site I had [a pretty solid version](https://web.archive.org/web/20250109165011/https://zachsaucier.com/) (TODO FIX) that I liked and is easy to keep up to date! In this version I relied more heavily on linking out to websites that I am more likely to update like [my Bluesky](https://bsky.app/profile/zachsaucier.com), [work history deck](https://www.figma.com/deck/K4Z77gNLmWb6ADFMOA6UU5), and [LinkedIn profile](https://www.linkedin.com/in/zach-saucier-051aa171/).

Does this version of my website show off the full extent of my abilities? No. But it does achieve my goals for having a personal website, at least for now.

### My blog

This principle can apply to infrastructure as well as user-facing products.

I started this blog in 2014 [with its own design](https://web.archive.org/web/20140624003209/zachsaucier.com/blog). The following year I gave it [a light re-paint](https://web.archive.org/web/20150614052602/http://zachsaucier.com/blog/) which helped it match my personal website branding and be a little easier on one's eyes.

But that version of the blog was hard for me to update. Not only was building Jekyll error prone, but I also lost the build files due to some hard drive failures. This contributed to me not writing to it from 2017-2023.

In 2023 I got some time to learn and play around with Svelte. I loved it and decided to rebuild my old Jekyll-based blog with Svelte. But I liked the overall look of my old blog so I decided to port it (making improvements to the styling and implementation as I went) to Sveltekit instead of building something new from scratch. It only took around 2 weeks of free, time with most of that time spent setting up Sveltekit exactly the way I wanted it to work. I also [wrote about that process](/blog/blog-refresh-2023/) if you're interested in reading more.

### My reader mode extension

After starting web development in 2013 I found myself regularly using the devtools to edit webpages with articles on them to make them more readable. In 2015 I decided to make a custom reader mode during a hackathon to automate some of these edits I regularly made, solely for my own use. That resulted in an open-source reader mode that I called [Just Read](https://github.com/ZachSaucier/Just-Read/).

To my surprise, more and more people started using Just Read. They made feature requests and I ended up implementing a lot of those features.

In 2018, around the 150k user mark, I started getting too many feature requests to keep up with in my free time. I decided to make a premium version to help justify putting in more time into maintaining the free version.

After a couple of weeks, I had a premium version along with [a marketing page](https://justread.link/) and user management pages. Now I earn (mostly) passive income from it monthly! The free version still serves ~240k users every week, including many students and people with disabilities. I still update it but only small pieces at a time — most of it is in "good enough" shape. [TODO add more info about iteratively adding new features]

## Maybe the key is to care but not strive for perfection

Maybe the key to all of this is caring. If you care, you will either know or make yourself come to know what your goals should be. If you don't care, it doesn't really matter how many users you talk to, you probably won't make something that's really helpful.

I also think that being okay with less-than-perfect end result is important. I probably wouldn't have ever completed Just Read if I was trying to monetize it from the start. I also might have built something that people didn't want if I did complete it.

Caring + iteration - perfection = A good output, created efficiently
