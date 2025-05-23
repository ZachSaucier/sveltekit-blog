---
title: The creator's niche dilemma and the curator's dilemma
date: 2025-02-17
description: Thoughts around social media's limits and how to potentially address them.
tags:
  - rambling
  - products
  - design
  - companies
# Image designed by kjpargeter / Freepik
# https://www.freepik.com/free-vector/abstract-background_7039071.htm#fromView=search&page=1&position=1&uuid=d20270d0-1fe1-433c-9a12-6b83abbb729d&query=colored+lines
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1739625905/threads_mnsjma.jpg
cover_width: 1200
cover_height: 850
cover_alt: Many colored threads flowing in parallel.
cover_in_post: false
---

## The creator's niche dilemma and the curator's dilemma

I don't post that much to social media. I mean, I do compared to people who don't post anything at all. It's more accurate to say that I don't post much compared to the average person who regularly posts to social media.

A big reason for my limited posting is that I stick to just professional content, which means I usually post about an article that I published or a project that I worked on. I also want my content to be relevant to my followers and fairly high quality.

However, I often have a desire to share more from other areas of my life. One example is sharing music that I found and liked recently. Another is dog videos, which I share privately with my wife, but I think some others might also like my highly curated dog videos.

But I think it would be pretty silly to post those things to my professional social media accounts, because people don't follow me for that content. Furthermore, if people did want to see my music likes or dog videos, why would they follow me when I primarily make web dev posts? I call this the creator's niche dilemma.

Relatedly, but on the other side of posting, there's a _lot_ of people who post high quality web development posts that I'd like to see. But many of those authors also post content outside of web dev that I don't care about. In small portions, I don't mind, but when they post non-tech posts regularly, I often don't find it worth the follow. I call this the curator's dilemma.

I've been thinking about these dilemmas for a while but don't have a good solution for either of them yet.

<span class="excerpt_marker"></span>

## Bluesky feeds

Bluesky feeds are one potential solution for the curator's dilemma. Bluesky allows anyone to make their own version of a feed where you can see filtered posts. It's one feature enabled by their more open AT protocol (they also provide [a starter project](https://github.com/bluesky-social/feed-generator) for creating a new feed generator).

The simplest feeds are ones that show all posts that contain a certain word. But you can technically use any post filtering method that you'd like. Examples include only including posts from a certain list, filtering by the media included, or even filtering by analyzing the video using a classification algorithm. The gist is that you can tell Bluesky (or other services that use the AT protocol) what posts you want to include and it will display those in the feed.

There are a few services that attempt to make it easy to set up a Bluesky feed. At the time of posting, the ones I'm aware of are [SkyFeed](https://skyfeed.app/) (by far the most popular as of right now), [Bluesky Feed Creator](https://blueskyfeedcreator.com/), and [Graze.social](https://www.graze.social/).

### Trying out the Bluesky feed creator apps

I tried each of them out. I attempted to make a feed that finds wholesome dog videos. This feed has some pretty simple requirements:

- Only keep top-level posts (no replies or reposts)
- Posts with videos only
- The videos feature wholesome dog content. At a minimum, include posts that have "dog" in the text that also has a video.

#### SkyFeed

- Only useful for creating a feed based on text in posts
- Got only photos of dogs by searching alt text values for "dog"
- No way to filter to just video content like I was hoping

#### Bluesky Feed Creator

- Allows filtering of posts that only have one type of media (like videos)
- No way to filter based on the content of videos themselves
- UI is the hardest to use
- I think the preview experience requires new posts that match your filters after you've created the feed, which could mean a long time in between making changes to the feed algorithm. But I couldn't actually get it to show posts so I'm not sure if that's true or not...

#### Graze.social

- Uses a visual, drag and drop builder of the logic for the feed
- More features than others (sentiment analysis, "image categorization", etc.)
- Had to look up their documentation for how to generate a preview (text buttons would be better than just using icons)
- Makes uses of thresholds from 0->1 in filtering a lot but there's no indication of what those numbers are for the posts in the generated feed to see what good threshold values I should use. Showing the values for the posts could greatly aid in figuring out how the filters should be adjusted
- Does a terrible job of filtering out NSFW content

### All of them suck

I know that it's early on in the Bluesky era, that creating a tool to allow people to generate a feed is hard, and that it's probably expensive to create an app that deals with Bluesky's firehose. But I was surprised by the low quality of these tools.

For one: Shouldn't all of these feed generators have a SFW filter on by default?? Why not?? When trying to create a feed of wholesome dog videos I accidentally generated a feeds that had more gay sex videos in them than dogs. I mean, my God, I would never allow my child to attempt to use these tools in their current state if I, as a very tech savvy adult, can't prevent _accidental_ porn from showing up in the generated feeds. **_Turn on SFW filters by default_**.

None of the apps were user friendly. None of them came close to feeling like a native experience.

None of the apps have a great preview experience. It'd be super useful to preview the generated feed with the ~7 days of content or something like that.

So while I will probably try these tools again sometime in the future, I don't think they're close to solving the curator's dilemma right now.

I hope that custom Bluesky feeds continues to get attention, both from Bluesky and from third parties, because I think they could add a lot of value to users of Bluesky.

## The creator's niche dilemma is still unaddressed

However, even in a world where Bluesky feeds solves the curators dilemma, it doesn't solve the creator's niche dilemma. Most people aren't going to use a custom feed to consume their content because curation requires effort, regardless of how much. That means that they're going to get _all_ of the posts I make, which means I should probably stick to one (or two, if they're similar areas) areas of content for my account to maximize exposure of that content.

In an effort to solve the creator's niche dilemma in our current social media landscape, I've tried creating multiple accounts and only posting content to the account based on the "theme" for that account. But switching between the various profiles is a pain, so I didn't keep it up for long. Plus it doesn't really feel like it's _me_ posting if I have a bunch of different profiles.

### An idea for a solution?

I'd like to see a platform that allows you to easily create feeds with specific themes. For example, I could have a feed for web dev / tech posts, a feed for music I like, and a feed for dogs. They'd all be under my account, but other users could subscribe to one or multiple of my feeds. I could create a post that gets posted to multiple of these lists. I could also repost other people's content to a particular list that I own (with proper attribution). Lastly, maybe I could also have a private feed for close friends that has my life updates or musings.

In essence, it'd be a way to show, "Hey, I'm Zach and here's a few different areas of things like that I like. If you like one of the same areas, you can follow that content specifically".

I think a platform like this could solve the creator's niche dilemma and the curator's dilemma at the same time.

In theory, one could use the Bluesky / AT protocol for this, but instead of emphasizing users and subscribing to all of their posts, you would primarily subscribe to custom feeds. You'd also have to make creating feeds significantly easier and let people put their posts in a particular feed that they own exclusively through a user action instead of some analysis of the content itself. Perhaps as an MVP you could just use hashtags or something similar, but then you'll have naming conflicts and "extra" content in the posts themselves — I don't know of a way to do this with the current AT protocol.

So if I were doing this, I might at least consider using a custom protocol that is made for this use case and then weigh the tradeoffs of using that custom approach vs an already used protocol.

I might try to play around with this idea and see where it gets me. Or I might have better things to do. We'll see! If you create something like the platform that I describe here, I'd love to see it!
