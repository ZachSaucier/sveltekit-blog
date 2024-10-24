---
title: External link icons
date: 2024-06-29
description: What caused me to add external link icons and some considerations about how to implement them.
tags:
  - code
  - css
  - svg
  - icons
cover_image: https://res.cloudinary.com/desumhldo/image/upload/v1719702163/external-link-icon_xhwy4d.png
cover_width: 2496
cover_height: 904
cover_alt: An external link with an icon to indicate that along with an internal link with no icon.
cover_in_post: false
---

I was skimming Hacker News and read [this article about microfeatures](https://danilafe.com/blog/blog_microfeatures/). This blog already had several of these features, but one I didn't think about adding until I read the article is an icon to visually indicate external links. As you can tell, I added this feature to my blog!

<span class="excerpt_marker"></span>

The implementation that the website used for these external links was different than I expected it to be:

- **It uses an inline SVG.** While not a big deal, I'd opt to use CSS for something that is purely for style like this if possible. One benefit of using the SVG inline is being able to set the SVG's `fill` and `stroke` to `currentColor`. One thing I might do differently if using an inline SVG is adding `aria-hidden` to hide it or adding `role="img"` and a `<title>` so that a screen reader can know what it is.
- **It makes use of an external SVG file as opposed to a data URI.** I really don't think this matters much so long as both are cached (data URIs are cached if the CSS file that they're in is cached), but I lean towards using a data URI for something like this when possible so that it's kept in the place where it's used and nowhere else.
- **It loads a large-ish SVG with a lot of icons, then uses one from that SVG.** I assume it does this so that all icons on the whole site can be loaded at the same time and then cached. I am not really against doing that, it's just different than how I imagined it would work.

I made my own implementation for my blog. It resulted in [this demo](https://codepen.io/ZachSaucier/pen/PovamVL?editors=0100). The key, but potentially unfamiliar, features are 1. the use of a data attribute `a[href^="https"]` to select only external links and 2. the use of `mask-image` with `currentColor` to change the SVG's "fill". The `mask-image` is necessary since the SVG is a `background-image` as opposed to inline. I apply it to a pseudo-element so it can be applied with only CSS and be ignored by screen readers.

Which approach is better? In the end, they're fairly different but both are solid. The best option is whichever fits your codebase better!
