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

I first saw `console.info` for more stylistic purposes in Ahmad Shadeed's [post breaking down the Photoshop web application](https://ishadeed.com/article/photoshop-web-css#photoshop-old-logo). When I [was refreshing my blog](/blog/blog-refresh-2023/), I thought it would be fun to add something like that to my own site.

However, I love animation and was wondering if I could animate it somehow. This led me to explore a bit and this post is what I learned!

<span class="excerpt_marker"></span>

## How different browsers handle `console.info`

<ContentAside>
  <p>Note: Using <code>console.info</code> in this way is very experimental and these results are likely to be inaccurate at some point in the future.
</ContentAside>

### Safari

The Photoshop web app doesn't support Safari (I feel you, Adobe. I feel you.) so I pasted the code directly into the Safari console to test. I saw that it looks like a bunch of jibberish:

### Firefox

### Edge

### Chrome

Only Chrome supports this more complicated rendering inside of `console.info`.

## Exploring the capabilities of `console.info`

To explore what all we are able to do inside of a `console.info` message, I started by simply copying, pasting, and modifying `console.info`s directly in my dev tools console. Once I realized it was going to take a bit longer to explore all that I wanted to explore, I started writing the HTML in a text editor, then pasting that into Yoksel's [SVG URL encoder](https://yoksel.github.io/url-encoder/), and then pasting that into a `console.info` in the console.

However, as I continued to test, I ended up making [a CodePen](https://codepen.io/ZachSaucier/pen/GRzypKq?editors=0010) that could automatically convert my HTML SVG into a data image, put it into a `console.info`, and run it for me. This ended up saving me a good bit of effort.

### Attempting to use the style tag and CSS animations

I already knew from the Adobe usage that SVGs were supported in at least a basic capacity. I checked to see if it supported `<style>` tags inside of the SVG. Thankfully, but not too surprisingly, it worked!

From there I added a CSS keyframe animation. It also worked! So I already knew that I could use it to animate the SVG inside of a `console.info`.

I tried using `:hover` to see if I could make it interactive: Nope.

### Attempting to add JavaScript

Even though I was content just using a CSS animation for my SVG, I naturally had to also test to see if using a `<script>` tag inside of the `console.info` SVG would work. In my mind, surely it wouldn't work because "security" and "circular references", right?

My first test was just placing a `console.log` in a script tag in the SVG. To my surprise, it showed up!

However, it logged _before_ the `console.info`. After a while of being confused, I realized that the log was from the HTML version of the SVG and not from the script inside the `console.info` SVG. If it worked, it would have showed _two_ console logs, one before the `console.info` and the other one after it.

To make sure that future tests were done properly, I made sure to clear the console properly before running the `console.info`.

Then I did another test: using a DOM reference and changing the SVG text:

```html
<tspan id="line1">thanks for</tspan>
...
<script>
  const line1 = document.querySelector('#line1');
  line1.textContent = 'test';
</script>
```

It worked! So some level of JavaScript was supported. Just not `console.log`s.

I tried putting a `console.log` inside of a `setTimeout` to see if it would work around the limitation. It didn't. Neither did `console.info`.

Next I tried multiple script tags and global variables. They worked!

Then I moved on to loading external scripts (I tested with GSAP). Sadly, no luck.

I then tried using `prompt` to get user input. Didn't work.

## Exploring what SVG options work

Using an `<a>` tag: No go.

`stroke-dashoffset` animation (line drawing animation): Works!

TODO investigate when console opens and fire animation then

## My `console.info` attempt

I originally had `<text>` with "thanks for stopping by" in it. However, I noticed that this created a bit of extra space in the console:

In browsers that don't support this advanced rendering inside of `console.info` this just appears like an empty line in the console. That's an acceptable tradeoff in my book!
