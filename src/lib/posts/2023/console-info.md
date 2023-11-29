---
title: console.info explorations
date: 2023-12-05
description: An article exploring the capabilities and limitations of console.info.
tags:
  - code
  - javascript
draft: true
---

<script>
	import ContentAside from "$lib/components/ContentAside.svelte";
  import CodePen from "$lib/components/CodePen.svelte";
  import Lightbox from "$lib/components/Lightbox.svelte";
</script>

I heard saw `console.info` for more stylistic purposes in Ahmad Shadeed's [post breaking down the Photoshop web application](https://ishadeed.com/article/photoshop-web-css#photoshop-old-logo). When I [was refreshing my blog](/blog/blog-refresh-2023/), I thought it would be fun to add something like that to my own site.

However, I love animation and was wondering if I could animate it somehow. This led me to explore a bit and this post is what I learned!

<span class="excerpt_marker"></span>

## How different browsers handle `console.info`

<ContentAside>
  <p>Note: Using <code>console.info</code> in this way is very experimental and these results are likely to be inaccurate at some point in the future.
</ContentAside>

The web Photoshop app doesn't support Safari (I feel you, Adobe. I feel you.) so I pasted the code directly into the console to test. I saw that it looks like a bunch of jibberish:

Firefox

Edge

TL;DR: Only Chrome supports this more complicated rendering inside of `console.info`.

## Exploring the capabilities of `console.info`

At first I was just copying, pasting, and modifying `console.info`s in my dev tools console directly. This worked fine for a bit but it was kind of a hassle. Writing the HTML in a text editor and then pasting that into Yoksel's [SVG URL encoder](https://yoksel.github.io/url-encoder/) made it more palatable.

But given how many tests I was doing, making [a CodePen](https://codepen.io/ZachSaucier/pen/GRzypKq?editors=0010) that could automatically convert my HTML SVG into a data image, put it into a `console.info`, and run it ended up saving me a lot of time.

### Attempting to use the style tag

I already knew from the Adobe usage that SVGs were supported in at least a basic capacity. I checked to see if it supported `<style>` tags inside of the SVG. Thankfully, but not too surprisingly, it worked!

From there I added a CSS keyframe animation. It also worked! So I already knew that I could use it to animate the SVG inside of a `console.info`.

### Attempting to add JavaScript

Even though I was content just using CSS animation, I naturally had to also test to see if using a `<script>` tag inside of the `console.info` SVG would work. In my mind, surely it wouldn't work because "security" and "circular references", right?

To my surprised, my `console.log('test')` worked great! Even more surprising, the log was placed _before_ the SVG that was rendered in the console. I don't really understand why... Maybe it's because the browser renders the SVG as its own page and then logs it to the console?

And, of course, the next thing I had to try was a `console.info` inside of a `console.info`. Sure enough, it works as well! Even having a `console.log` inside of the `console.info` that's inside of a `console.info` works 🤯.

At this point, I was absolutely tickled with what I had discovered. This is such a cool and surprising little potential feature!

Also at this point, I was pretty sure most most anything would work inside of the script tag.

I tested DOM references by switching out some of the text using:

```html
<tspan id="line1">thanks for</tspan>
...
<script>
  const line1 = document.querySelector('#line1');
  line1.textContent = 'test';
</script>
```

Worked great. So you could do something like scramble text for SVG content in the console no problem.

I then tried using the `prompt` method to get user's input to set the text. This worked.

`window.addEventListener("load", () => ...)` worked well.

Tried importing a third party script but couldn't get it working

## My `console.info` attempt

I originally had `<text>` with "thanks for stopping by" in it. However, I noticed that this created a bit of extra space in the console:

In browsers that don't support this advanced rendering inside of `console.info` this just appears like an empty line in the console. That's an acceptable tradeoff in my book!
