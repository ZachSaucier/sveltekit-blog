---
title: Why not use HTML tables for layout?
date: 2014-09-30
tags:
  - code
  - javascript
# cover_image: /images/PLACEHOLDER_IMAGE.jpg
# cover_width: 16
# cover_height: 9
description: Reasons why you should not use HTML tables for layout.
---

<aside class="content_aside">
  <strong>Aside:</strong> This question was originally asked on WebDesign.StackExchange.com, a private beta that ended up being deleted on October 6th, 2014.
</aside>

Why should I not use a table for my layout?

<hr>

This question has been discussed <a href="https://stackoverflow.com/q/83073/2065702">on Stack Overflow</a> as well as many other sites. I’ll summarize the main points here.

We should use tables, but **_only for tabular data_** because it is incorrect, and more difficult to use tables for layout.

<span class="excerpt-marker"></span>

- **It’s invalid HTML** to use tables for _layout_ as of HTML 4.01
- **Tables take longer to render** due to the in depth calculations for positioning/sizing
- **Tables are not very accessible** – screen readers usually do a poor job of reading them
- **Tables are (relatively) inflexible** – developing for mobile, getting exact widths and positioning is often difficult
- **Tables are often bad for SEO** because crawlers have a difficult time parsing the content
- **Tables prevent incremental rendering** – i.e. the whole thing waits until it shows
- **Tables make it more difficult to use images** because they sometimes have to be cut up into smaller ones
- **Tables don’t always print well**
- **Tables restrict the design to certain layouts** ex. is child with `height:100%` of page
- **Tables make redesigns much more difficult** – the same goes for updates

Again, _tables for tabular data is okay – for anything else it’s not_
