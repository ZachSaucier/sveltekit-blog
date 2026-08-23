---
title: Navidrome
date: 2026-08-22
description: Notes about my second app for self-hosting my own personal music server.
tags:
  - projects
  - products
  - music
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1787447003/friendship-ended_uphfmp.webp
cover_width: 1000
cover_height: 750
cover_alt: The "Friendship ended" meme saying my friendship ended with Subsonic and now Navidrome is my best friend.
cover_in_post: true
---

I've been using [Subsonic](https://www.subsonic.org/pages/index.jsp) to self-host my personal music library for many years. I even wrote [a love / hate blog post](/blog/subsonic) about it back in 2024. It's always been "good enough". 

But a few months ago my friend talked to me about the open-source alternative to Subsonic: [Navidrome](https://www.navidrome.org/). It's a faster, better maintained, free alternative to Subsonic.

Today I found the time to get it up and running. Unsurprisingly it exceeded Subsonic in just about every way!

<span class="excerpt_marker"></span>

## Setting it up

I had a Cursor agent download it and get it set up. I then worked with the agent to set up web access to it, which meant I needed a domain.

I use AWS for all of my other personal projects to I was interested in just using it for the connection if I could. My agent explained that I could use Lightsail/EC2 + WireGuard + a reverse proxy + Route53 to make the connection but it would cost me ~$7 a month to do so.  Instead it recommended setting up a free Cloudflare Tunnel to my computer.

I tried setting up a Cloudflare Tunnel to a subdomain of my main website, [zachsaucier.com](/), but it turns out you can't do that on Cloudflare Tunnel's free plan.

So instead I bought a domain on the cheapest TLD that I know of that is reasonable: `.link` (I already use this for [justread.link](https://justread.link/)) and hooked it up.

And it all worked great! Including with the iOS app that I already use to connect to my music library from my phone.

## The downsides

So far I'm only aware of two downsides.

The first is that I have to pay ~$8 a year for the domain (a domain was included with my lifetime payment to Subsonic).

The second is that I don't have the ability to edit the interface quite as easily as Subsonic. Instead of opening up file editor and tinkering I'd have to rebuild the app. That's too much work for the tweaks I wanted to make. So instead I added [some user styles](https://gist.github.com/ZachSaucier/52f70aa7bcbd74bf6982794e4f540ae0) using [Stylus](https://github.com/openstyles/stylus) for the site and called it a day.

## The result

Now my music library works better than ever! Yay open source!

Now I'm thinking what else should I be self-hosting like this...
