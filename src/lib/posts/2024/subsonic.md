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

I never stopped doing that. Since I was a kid I had music that was not on or was split across streaming services: music from NewGrounds, songs I made, custom edits of songs that I made (mostly just chopping off a section of a song but occassionally speeding up a song), or songs that are only available on one streaming service. This made me never want to transition to streaming services as a the primary way that I listened to my own music.

<span class="excerpt_marker"></span>

For a while I used Google Play Music's (now YouTube Music's) music uploading service. This allows you to upload a ton of music from your computer and listen to it remotely through their app.

However, Google Play / YouTube Music falls short when wanting to share this playlist with others. Since it's music you uploaded and they don't have the rights, Google doesn't let people who aren't you listen to the playlists (or music files) that you have uploaded.

In response, I wrote [a script to scrape my playlists](https://webapps.stackexchange.com/a/106604/140514) and generate the tracklist. I experimented with ways of generating playlists from this tracklist in services like YouTube and Spotify. However, nothing really did a good job and there were always the missing tracks that I've modified myself.

I put up with this for a while but eventually wanted a better solution.

## Enter Subsonic

[Subsonic](https://subsonic.org/pages/index.jsp) is an old, unmaintained, and buggy personal media streamer. However, there's not really a lot of personal media servers that emphasized music and not video. So I tried it out.

I was able to add my music without issue. I got my music playlists working without too much effort by formatting the tracklists in [m3u format](https://en.wikipedia.org/wiki/M3U) then importing them.

My streaming needs from other devices were covered as there are a [good many apps](https://subsonic.org/pages/apps.jsp) that support streaming from a [premium](https://subsonic.org/pages/premium.jsp) Subsonic server (I use [iSub](https://isub.app/) on my phone). It even supports streaming to the Sonos app!

Sharing was covered also. Subsonic lets you have user accounts, each with their own login. For the first year I shared my playlists with people this way.

Recently I found out that there's an even better way of sharing a playlist with Subsonic: you can create a "Share" view of a playlist that doesn't require any authentication! So now I can make a link for a friend to listen to my playlist and share it with them and they can access it instantly. Pretty sweet.

And with that, all of my core needs are covered.

## The negatives of Subsonic

Subsonic is far from a perfect product. But thankfully since it is self-hosted I can fix things myself.

For example, the default playlist section gets too small when you un-hover it. When it's this small, it's tough to add a song to a playlist Thankfully that's an easy code change!

I also made changes to improve the trackbar to make it easier to click, drag along, and see.

A major issue I've had with Subsonic happens when my computer crashes (it has serious overheating issues when I play most games made in the last ~10 years). When my computer crashes and Subsonic is closed unexpectedly, it seems to massively bloat the `.data` file (database). In response, I had to increase the max amount of RAM that Subsonic uses. After it happened more times I couldn't even fix it by further increasing the max RAM. I had to basically reinstall from scratch (which, thankfully is pretty easy if you carry over the `subsonic.properties` file and have backed up all of your playlists, which I now do every time I update via [a script](https://gist.github.com/ZachSaucier/ecb911278a999b1d4bb505cd5548bb4e) that I paste in).
