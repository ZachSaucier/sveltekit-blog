---
title: I'm a vibe coder
date: 2026-06-27
description:
tags:
  - code
  - projects
  - products
  - ai
  - technology
  - process
# Image from https://openverse.org/image/b8915450-c5b3-4a92-bf67-7f73e0477d80?q=dog+sunglasses&p=29
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1782505844/chillin_cxaee8.jpg
cover_width: 845
cover_height: 681
cover_alt: A dog relaxing on some stairs with red sunglasses on.
cover_in_post: false
---

I published my first fully vibe coded application: [Toddler Photo Lock](https://toddlerphotolock.com). It's extremely simple: Select a photo, start [Guided Access](https://support.apple.com/en-us/111795), and hand your phone to your toddler. Your kid can then view the photo without you having to worry about them doing something else on your phone.

<span class="excerpt_marker"></span>

## Why I wanted this app

Around 10 months old, my daughter started getting quite excited when she saw us using our phones and computers. My wife and I don't want her to think that phones are exciting.

We had the idea of showing her an image and locking the screen so that she can hold the phone. With nothing else to do, we thought she would eventually get bored.

Apple's built-in Guided Access feature along with the default Photos app nearly got us all the way there. But when using Guided Access in Photos she can still swipe between media and cause havoc with buttons. Then we tried but failed to find any app in the app store for this use case.

So I vibe coded it.

## A perfect match for vibe coding

A few things make this app a great candidate for full vibe coding:

- It's fully local-only by design. This means no server, no real security, and no worry about load. In other words, I don't need to make important architectural decisions that have long term impacts.
- Its scope is extremely limited. Grant access to some photos, pick one, and have the screen lock. That covers the main features! With an app this simple you don't have to worry about code reuse, following consistent patterns across the application, or any of the concerns that you have with large codebases.
- (personal reason) It's an iOS-native application. I'm a web developer. I know close to nothing about native mobile application development. I could have made a web app and added it to my home screen via "Add to Home Screen" but then 1. there's a lot of overhead with a web browser and 2. if you're going to vibe code something why not vibe code the more correct thing?

## Fully vibed still requires effort

My daughter was 14 months old when I finally got the app published in the App Store. Building the initial app that worked on my phone only took a day. Getting the app published (with my limited ability to work on the app) took 3 months.

I worked with Gemini to estimate the feasibilty of the app and create a big picture plan. I then worked with Augment Code with GPT 5.4 to flesh out the plan and made some manual edits.

Then I had Augment go at it. It got the job done! But, naturally, there were ambiguous or missing things in the spec and I had to iterate a bit. This is where the majority of the actual development time was spent, adding little features that I didn't think of or didn't know were required to publish to the app store (like having an in-app privacy page).

I then spent time setting up the project [on GitHub](https://github.com/ZachSaucier/Toddler-Photo-Lock/) with an MIT license (because I feel like anything modest and fully vibe coded should probably be open source) including creating [a FAQ](https://github.com/ZachSaucier/Toddler-Photo-Lock/wiki/FAQ) and GitHub [issue templates](https://github.com/ZachSaucier/Toddler-Photo-Lock/tree/main/.github/ISSUE_TEMPLATE) because I've found both of those things to be incredibly useful with [Just Read](https://justread.link).

I also felt the need to create a tiny, bareboned [marketing site](https://toddlerphotolock.com).

### App Store review is hell

To get the app in the App Store I had to do a _ton_ of little tasks like adding a description, adding preview photos, creating an icon, and sizing everything in the way that they want.

I learned that in order to post to the App Store you have to join the Apple Developer Program. And it costs nearly $110 annually!?! Coming from the web side of things that's crazy to me. On the web all you need is a ~$10 domain (if that!) and a static file host. Thanks vendor lock in and monopolization...

The App Store has many checklists of requirements / tasks, one after another. No checklist is comprehensive. Some todo items in App Store Connect didn't show the first time around. Documentation for uploading a build was hard to find and what I found had broken links and no clear steps. I resorted to using Google Search's AI answer which was more useful.

My first submission was rejected because I needed to have a parental lock on any outbound links (like the FAQ) and I needed to use Apple's payment system in-app instead of a link to [Buy Me A Coffee](https://buymeacoffee.com/zachsaucier).

When I tried to set up in-app purchasing I got a "Missing metadata" warning with no indication of what's missing. I also was told images I tried to upload were of the wrong dimension but it didn't specify what the dimension they should be. It turns out my iPhone 11 is too old so the size of the screenshot I took is smaller than the current gen iPhone and that prevented me from using being able to use the screenshot directly.

Additionally, for setting up in-app purchases, having a `.storekit` file is apparently not sufficient. I had to select the `.storekit` file I made, select it in XCode, then add all of the values a second time through the XCode app.

When I tried to resubmit to the app store I got a "You do not have required contracts to perform an operation" error but it didn't say what was missing. It turns out I had to go to https://developer.apple.com/account and accept an updated agreement.

I failed the next submission because I didn't sign the paid app agreement but it didn't tell me I needed to sign that until they rejected my submission.

The next submission was rejected for 3 reasons, none of which were made clearhow I broke them. I asked and they said 2 were not issues and told me what the third was, which I then fixed.

This confusing back and worth happened several more times. If Steve Jobs were watching I think he would have fired some people who were responsible for such a terrible experience.

### Time taken

Lastly I felt the need to write this blog posts...

All in all the app itself took me around 3 hours of planning and "development" time (which was mostly me multi tasking, checking in and giving new prompts). I spent another 6+ hours setting up the GitHub project, creating a website, and getting the app in the App store. Then I spent 3 months in App Store back-and-forth hell...

Without LLMs developing this app would have taken me significantly more time. Realistically I just wouldn't have ever made the app.

## In general I don't recommend using AI in this way

Though I did look at a small portion of the code to update strings and such (e.g. prompting an LLM to change "Choose More" to "Choose more" still feels wrong to me), I don't know the technical details of how this app works. That's interesting to me.

This app was a great fit for coding in this way. Most apps are not.

In my day job I use agents to speed up the planning and coding processes but do a _LOT_ more technical-level implementation guiding. In large, complicated, convoluted codebases there's also more areas where this generation of agents gets stuck / gets it wrong. So I don't expect to be fully vibe coding most of the time during my day job, at least in the near term.
