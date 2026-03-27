---
title: I'm a vibe coder
date: 2026-04-03
description:
tags:
  - code
  - projects
  - products
  - ai
  - technology
  - process
cover_image:
cover_width:
cover_height:
cover_alt:
cover_in_post: false
draft: true
---

I published my first fully vibe coded application: [Toddler Photo Lock](https://toddlerphotolock.com). It's extremely simple: Select a photo, start [Guided Access](https://support.apple.com/en-us/111795), and hand your phone to your toddler. Your kid can then view the photo without you having to worry about them doing something else on your phone.

<span class="excerpt_marker"></span>

## Why I wanted this app

My daughter is currently 11 months old. Last month she started getting quite excited when she sees us using our phones and computers even though around her we only use them for taking photos, checking the weather, checking our calendars, etc.

We don't want her to think that phones are exciting. Optimally we'd love to be able to use our phones and have her not be interested in them. But the only way for her to lose interest is if she can sufficiently investigate it and then get bored. With a fully functioning smart phone that's hard to do.

We had the idea of showing her an image of somebody that we know and locking the screen so that she can use the phone. But with nothing else to do she will eventually get bored with it. Apple's built-in Guided Access along with the Photos app nearly got us all the way there. But when using Guided Access in Photos she can still swipe between media and cause havoc with buttons. Then we tried but failed to find any app in the app store for this use case.

So I vibe coded it.

## A perfect match for vibe coding

Here's what makes this app a great candidate for vibe coding:

- It's fully local-only by design. This means no server, no real security, and no worry about load. In other words, I don't need to make important architectural decisions.
- Its scope is extremely limited. Grant access to some photos, pick one, and have the screen lock. That covers the main features! With an app this simple you don't have to worry about code reuse, following consistent patterns across the application, or any of the concerns that you have with large codebases.
- (personal reason) It's an iOS-native application. I'm a web developer. I know close to nothing about native mobile application development. I could have made a web app and added it to my home screen via "Add to Home Screen" but then 1. there's a lot of overhead with a web browser and 2. if you're going to vibe code something why not vibe code the more correct thing?

## Fully vibed still requires some effort

I worked with Gemini to estimate the feasibilty of the app and create a big picture plan. I then worked with Augment code with GPT 5.4 to flesh out the plan (and made some manual edits to the plan).

Once I had a solid plan I turned "Auto" on and let it go at it. I had to step in a couple of times to accept some agreements and unblock it.

Once it was done, I tested in the emulator. It got the job done! But, naturally, there are things that were ambiguous of missing in the spec and I had to iterate a bit. This is where the majority of the development time was spent, adding little features that I didn't think of or didn't know were required to publish to the app store (like having an in-app privacy page).

<script>
	import ContentAside from "$lib/components/ContentAside.svelte";
</script>

<ContentAside>
  <strong>Aside:</strong> I used [Augment Code](https://www.augmentcode.com/) for most of the app creation. I really enjoyed using it! It had high quality output. But I ran out of credits on the free plan and switched to [Copilot's chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat). It was very disappointing. Where Augment interpretted what I was wanting and did the action more generally, Copilot focused on the exact example I made and was bad at generalizing across the app. The context window, at least on the free version, was also way more limited. Additionally Copilot was way more sycophantic and made mistakes more often.
</ContentAside>

After I had built the app itself, I spent more time setting up the peripherals around it to get it onto my phone and published for the world to use.

I set up the project [on GitHub](https://github.com/ZachSaucier/Toddler-Photo-Lock/) with an MIT license (because I feel like anything modest and fully vibe coded should probably be open source) including creating [a FAQ](https://github.com/ZachSaucier/Toddler-Photo-Lock/wiki/FAQ) and GitHub [issue templates](https://github.com/ZachSaucier/Toddler-Photo-Lock/tree/main/.github/ISSUE_TEMPLATE) because I've found both of those things to be incredibly useful with [Just Read](https://justread.link).

I also felt the need to create a tiny [marketing site](https://toddlerphotolock.com). I kept it as barebones as I could manage.

To get the app in the App Store I had to a bunch of little tasks like adding a description, adding preview photos, creating an icon, and sizing everything in the way that they want.

<ContentAside>
  <strong>Aside:</strong> I learned that in order to post to the App Store you have to join the Apple Developer Program. And it costs nearly $110 annually!?! Coming from the web side of things that's crazy to me. All you need on the web is a ~$10 domain and a static file host. Thanks vendor lock in and monopolization...
</ContentAside>

Lastly I felt the need to write this blog posts...

All in all the app itself took me around 3 hours of planning and "development" time (which was mostly me multi tasking, checking in and giving new prompts). I spent another 6+ hours setting up the GitHub project, creating a website, and getting the app in the App store.

Without LLMs creating this app would have taken me significantly more time. Realistically I just wouldn't have ever made the app.

## In general I don't recommend using AI in this way

Though I did look at a small portion of the code to update strings and such (e.g. prompting an LLM to change "Choose More" to "Choose more" still feels wrong to me), I don't know the technical details of how this app works. That's interesting to me.

This app was a great fit for coding in this way. Most apps are not.

In my day job I use agents to speed up the planning and coding processes but do a _LOT_ more technical-level implementation guiding. In large, complicated, convoluted codebases there's also more areas where this generation of agents gets stuck / gets it wrong. So I don't expect to be vibe coding most of the time during my day job for the foreseeable future.
