---
title: What is the most efficient way to modify DOM elements and limit reflow?
date: 2014-09-30
tags:
  - code
  - css
  - javascript
  - performance
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description: Some tips to efficiently modify DOM elements while limiting reflow.
---

<aside class="content_aside">
  <strong>Aside:</strong> This question was originally asked on WebDesign.StackExchange.com, a private beta that ended up being deleted on October 6th, 2014.
</aside>

When working with a very dynamic UI (think Single Page App) with potentially large JS libraries, view templates, validation, ajax, animations, etc… what are some strategies that will help minimize or reduce the time the browser spends on reflow?

For example, we know there are many ways to accomplish a DIV size change but are there techniques that should be avoided (from a reflow standpoint) and how do the results differ between browsers?

<hr>

It’s best to try and avoid changing DOM elements whenever possible. At times you can prevent reflow at all by sticking to CSS properties or, if required, using CSS’ `transform`s so that the element itself is not affected at all but, instead the visual state is just changed. <span class="excerpt-marker"></span>Kayce Basques and Rachel Andrew go into detail about why this is the case in <a href="https://web.dev/articles/animations-guide">this article</a>.

This approach will not work in all cases because sometimes it’s required to change the actual DOM element, but for many animations and such, `transform`s brings the best performance.

<hr>

If your operations do require reflow, you can minimize the effect it has by:

- Keeping the DOM depth small
- Keeping your CSS selector simple (and saving complicated ones to a variable in JavaScript)
- Avoiding inline styles
- Avoiding tables for layout
- Avoiding JavaScript whenever possible

Nicole Sullivan posted a <a href="https://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/">pretty good article</a> on the subject that goes into more details of browser reflows and repaints.

If you’re actually changing the DOM, not DOM properties, it’s best to do it in larger chunks rather than smaller ones <a href="https://stackoverflow.com/q/11374247/2065702">like this Stack Overflow post</a> suggests.

<hr>

In the example you provided, the second method is the best because it is using CSS properties without needing JavaScript. Browsers are pretty good at rendering elements who’s dimensions and position is determined solely by CSS. However, it’s not always possible to get the element where we need to be with pure CSS.

The worst method is by far the third because jQuery’s animate is terribly slow to start out with, but making it fire on resize makes the animates stack on top of each other so it lags wayyy behind if you resize it much at all. You can prevent this by either setting a timeout with a boolean to check whether it’s been fired already or, more preferably, don’t use jQuery’s animate to do this at all but instead use jQuery’s `.css()` since the resize function fires so often that it will look animated anyway.
