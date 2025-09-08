---
title: Customer support is not thriving
date: 2025-09-08
description:
tags:
  - rambling
  - products
  - companies
  - culture
  - startups
  - ai
# Image by Dr.Baldy from https://openverse.org/image/927c59df-211b-4a57-a199-6c06ff83665e?q=customer+support&p=18
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1757344196/customer-support_h9w3wk.webp
cover_width: 1024
cover_height: 683
cover_alt: A clay person that has multiple toothpicks stabbed into them with Xs drawn as eyes.
cover_in_post: false
---

I've been doing some form of "customer support" for more than the last 12 years. I started my programming journey by participating on StackOverflow, answering more than 600 questions and doing around 7,000 other actions like commenting and making edits. My first full-time tech job at GSAP required heavy involvement in the (very helpful) [GSAP forums](https://gsap.com/community/). I've been maintaining a fairly well used (>200k monthly) open-source web extension, [Just Read](https://justread.link), for the last 10 years. Supporting Just Read means responding to customer emails and (now over 430!) [GitHub issues](https://github.com/ZachSaucier/Just-Read/issues).

All of that is to say that while I've never worked full-time in customer support, I've done my share of it.

Recently I had my least favorite experience as a customer trying to get support from a company. That company was [Thrive Market](https://thrivemarket.com).

<span class="excerpt_marker"></span>

## Thrive Market's poor customer service

Thrive Market is an online grocery delivery service for healthy groceries. Many of the items that they offer are slightly cheaper on Thrive Market than you might find them in a store like Whole Foods (though some are more expensive, so be sure to check if you want the best deal). I had been Thrive member for 5 years.

Recently Thrive sent an email that our subscription had been automatically renewed. But they had never sent an email that it was _about_ to be renewed -- I double-checked to make sure. In the last year we've hardly used Thrive Market. So had they sent an email about the upcoming subscription I wouldn't have let it renew.

I first saw the email that the subscription had renewed in the middle of the night when taking care of my baby daughter. I thought to myself that I could cancel the subscription and get a refund while holding her to get her back to sleep. Boy was that a bad decision.

I logged into my Thrive account and tried to cancel the subscription and potentially get a refund through the dashboard there. Unfortunately there was no way to cancel the subscription, let alone request a refund, through the Thrive dashboard.

Not allowing subscriptions to be cancelled in your UI is not only bad service but also illegal because of the FTC's "click-to-cancel" law (which was recently struck down in appeals court due to procedural issues but the FTC says it will still enforce the ruling).

At this point I thought, "That stinks but at least a customer support rep can straighten this out for me quickly". After starting the chat, like almost all companies these days, I was talking with a bot. A couple of "Speak to a representative"s later and I was talking with a real customer support rep.

After the first few templated messages, I didn't get a response for 5 minutes. So I thought I had broken the automation somehow and messaged, "Speak to a representative" a few times over a few minutes. But then the rep responded with "I am not a bot." followed by another copy-pasted answer offering a discount and then another 4 minute lack of response. After I refused again they provided _another_ copy-pasted answer _still_ not canceling my membership or giving me a refund.

Eventually they did cancel the subscription and give the refund but it took more than 30 minutes in total and continued persistance.

I can't be sure if the customer support rep was filtering all of their responses through an LLM but it sure seemed like it. I cannot imagine a worse chat experience than chatting with a human that is only responding with LLM-generated responses. [Don't feed me your AI slop](https://www.seangoedecke.com/dont-feed-me-slop/).

## My principles for good customer support

The above experience is obviously an example of poor customer support. What does good customer support look like?

<script>
	import ContentAside from "$lib/components/ContentAside.svelte";
</script>

<ContentAside>
  <strong>Aside:</strong> I think it's a great idea for employees at a company to have some experience doing customer support for their company. It's very helpful for becoming more familiar with user's actual use cases and issues. It helps build empathy and keep priority on serving customers and not on the bottom line.
</ContentAside>

Here are some principles that I try to stick to for the customer support that I do:

- **Respond quickly** -- I try to respond as soon as I see an email about an issue. Often times that means within minutes or hours of their message. People are always pleasantly surprised when I respond to an email or GitHub issue in that timeframe!
- **Talk to them like a human!** -- Greet them with their name if you have it or username if not. Respond to the details of their request. Make sure you address all of their topics, even when using a templated response.
- **Be grateful** -- If a paying user is contacting you to complain, still say thanks! They're supporting you! Not to mention it helps defuse some tense situations.
- **Be transparent** -- Tell the user exactly what the restrictions are, what the workarounds are, and how they can get the most out of your service.
- **Be proactive** -- Don't wait for a response if you can reasonably do it. For example if a customer reaches out to ask for a refund, provide the refund immediately. If you'd like to ask why they want to get a refund, do so _after_ confirming that the refund has been started.

Summed up into one word: [Care](/blog/user-centered-iteration/#maybe-the-key-is-to-care-but-not-strive-for-perfection).
