---
title: Subsonic
date: 2024-04-02
description: My personal audio server and some of the issues that I've ran into with it.
tags:
  - projects
  - music
cover_image: https://res.cloudinary.com/desumhldo/image/upload/q_100/v1702838810/console-delight/cover_daxdj0.webp
cover_width: 1620
cover_height: 582
cover_alt: An animation running in the dev tools console.
cover_in_post: false
---

## My pre-Subsonic era

Remember the days when all the music you owned was on some hardware in your home (computer, iPod Shuffle, CD, etc.)? Before streaming was the norm every person had to be their own music curator.

I never stopped doing that. I've always had music that was not on every streaming services: music from [NewGrounds](https://www.newgrounds.com/), music I made, custom edits of others' music (mostly just chopping off a sections of songs), or music that are only available on one streaming service. This made me never want to transition to streaming services as the primary way that I listened to my own music.

<span class="excerpt_marker"></span>

For a while I used Google Play Music's (now [YouTube Music](https://music.youtube.com/)'s) music uploading service. It allows you to upload a ton of music from your computer and listen to it remotely through their app.

However, Google Play / YouTube Music falls short in regards to sharing your playlist with others. Since it's music you uploaded and they don't have the rights, Google doesn't let people other than you listen to the playlists (or music files) that you have uploaded.

To try and remedy this, I wrote [a script to scrape my playlists](https://webapps.stackexchange.com/a/106604/140514) and create tracklists. I experimented with ways of generating playlists from these tracklists in services like YouTube and Spotify. However, nothing really did a great job and there were always missing tracks.

I put up with this for a while but eventually wanted a better solution.

## Enter Subsonic

[Subsonic](https://subsonic.org/pages/index.jsp) is an old, unmaintained, and buggy personal media streamer. However, there's not really a lot of personal media servers out there that emphasize music (not video) streaming. So I tried it out.

I was able to add my music without issue. I got my music playlists working without too much effort by formatting the tracklists in [m3u format](https://en.wikipedia.org/wiki/M3U) then importing them.

My streaming needs from other devices were covered as there are a [good many apps](https://subsonic.org/pages/apps.jsp) (I use [iSub](https://isub.app/) on my phone) that support streaming from a [premium](https://subsonic.org/pages/premium.jsp) Subsonic server. Subsonic even supports streaming to the Sonos app!

Sharing was covered also. Subsonic lets you have user accounts, each with their own login. For the first year I shared my playlists with people this way.

Recently I found out that there's an even better way of sharing a playlist with Subsonic: you can create a "Share" view of a playlist that doesn't require any authentication! So now I can make a link for a friend to listen to my playlist and share it with them and they can access it instantly. Pretty sweet.

And with that, all of my core needs are covered.

## The negatives of Subsonic

Subsonic is far from a perfect product. But thankfully since it is self-hosted I can fix things myself.

For example, the default playlist section gets too small when you un-hover it. When it's this small, it's tough to add a song to a playlist Thankfully that's an easy code change!

I also made changes to improve the trackbar to make it easier to click, drag along, and see.

There's a _lot_ of other UI changes I might make but to be honest, it's "good enough".

### The biggest problem I've had with Subsonic

The most major issue I've had with Subsonic happens when my computer crashes, which it does fairly often due to some serious overheating issues.

When my computer crashes and Subsonic is closed unexpectedly, it massively bloats the `.data` file (database).

When this first caused Subsonic to not start due to a database out of memory exception (note that the issue Subsonic gives the front-end is a generic 503 error but you can tell if this is the issue by opening the service agent log), I was able to fix it by just bumping up the max amount of RAM Subsonic used.

The second time it happened I couldn't fix it by further increasing the max RAM. Instead, I had to delete both the Subsonic application directory and the Subsonic personal directory.

**Note:** Before you delete these directories make sure to backup your `subsonic.properties` file and all of your playlists! I made [a script](https://gist.github.com/ZachSaucier/ecb911278a999b1d4bb505cd5548bb4e) to download all playlists that you have, just make sure the number of playlists is changed to the number of playlists that you have (the ID of the most recent one created gives you the count).
