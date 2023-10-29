---
title: Why do we use responsive units like em instead of px when designing responsive sites?
date: 2014-09-30
categories:
  - code
  - css
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description: This post covers some of the benefits of using units other than pixels when designing responsive sites.
---

<div class="aside">
    **Aside:** This question was originally asked on WebDesign.StackExchange.com, a private beta that ended up being deleted on October 6th, 2014.
</div>

I understand that the overall goal is to stay responsive, but what is the purpose of avoiding pixels?

<hr>

The purpose of avoiding any **absolutely**<sup class="footnote"><a href="#one">1</a></sup> **sized units** like `px` (includes `in`, `mm`, and `cm`) is to allow our content to be as responsive as possible with the least amount of work. Absolutely sized units are only one type of unit. In this post I’ll go into more detail about the others.

<span class="excerpt-marker"></span>

<h3>Font-relative units</h3>

As j6m8 covered in depth already (_see bottom of this post_) we can size things based on the font size. This includes relative to the current font size (`em`, `ex`<sup class="footnote"><a href="#two">2</a></sup>), relative to the root font size (`rem`), and absolutely sized based on the font (`pt`, `pc`). Since the most common and useful of these have already been covered, I recommend to read <a href="https://learn.scannerlicker.net/2014/07/31/so-how-much-is-an-em/">this article</a> to find out more about ems and I’ll skip ahead to the next type.

<h3>Viewport-relative units</h3>

These units are relative to the _viewport_ – meaning the size of the window that the element is being rendered in. They include `vw` (viewport width), `vh` (viewport height), `vmax` (the max of `vh` or `vw`), and `vmin` (the min of `vw` and `vh`).

They are sized by using a percent of the viewport. For example `1vw` is equivalent to 1% of the viewport’s width. This is the same regardless of how nested the element is. In other words it ignores the size of its parent(s).

<h3>Relative to the parent</h3>

The `%` unit is relative to the element’s parent, given it’s in the same stacking context<sup class="footnote">3<a href="#three">3</a></sup>. This means that if a parent has `width:500px` and the child has `width:50%`, the child’s width will be equivalent to `width:250px`.

<hr>

As always, you should check the support of the units that you’re using, but most all of these are supported

One of the common “gotchas” of using `em`s, `ex`s, and `%` for fonts is that they stack on each other, meaning that they are <a href="https://jsfiddle.net/4md78ake/">relative to their parent’s font size</a>.

For more reading, you can take a look at the <a href="https://www.w3.org/TR/css3-values/#absolute-lengths">W3 spec</a> or <a href="https://css-tricks.com/the-lengths-of-css/">CSS Tricks article</a> on the subject.

<hr>

<h2>So what’s the purpose?</h2>

Well, as I stated earlier, the purpose is to make our content as responsive as possible with the least amount of effort on our part. By having multiple unit types, it gives us more freedom to create layouts and size our elements the way that we want to. This will save us time and effort.

Instead of sizing our elements absolutely, requiring several media queries to resize them in order to be responsive, we can more often than not use a relative unit to reduce the need of media queries. This way our page can resize based on the current context of the page and parent’s properties, requiring less work to make our elements fit nicely on the page.

Using relative units also allows us to make changes to the content more easily in the future. Instead of having to rethink all of our layout because a new element is slightly larger than the previous, we can let our sizing and positioning be more malleable. This give us more breathing room as to what’s acceptable. Having relative sizing also goes hand in hand with how we position our elements which is for another post.

    <sub id="one">1. Units like pixels are arguably not “absolute” because pixels are rendered differently across different devices, but that’s a separate issue.</sub>
    <sub id="two">2. Some people may talk about a `ch` unit which is like `ex` but based on the width of the 0 character. It is not in the W3 spec and is not well supported.</sub>
    <sub id="three">3. An element can be taken out of its parent’s stacking context by positioning it absolutely while statically positioning its parent.</sub>

<div class="aside">The next section was written by <a href="https://jordan.matelsky.com/">Jordan Matelsky</a></div>

**`em` units are responsive by design.**

<h2>What is an em?</h2>

The term ‘em’ comes from old typographical calculations, where ‘em’ actually refers to the letter **M**. One ’M’ unit was once the width of the uppercase letter **M**, which was, at least on early printing presses, the same size width-wise as it was height-wise. A useful byproduct of this was that typographers could equate 1em to the same measurements as the point-size; that is, 12pt fonts were 12pt tall, and so 1em = 12pt.<sup><a href="https://en.wikipedia.org/wiki/Em_(typography">Wikipedia</a>)</sup>. This came in handy for other typographical marks, like the em-dash (or _M_-dash), [**—**], which is one em wide (the same width as an M) or an _M_-space (guess how big it is.)

(Nowadays, fonts vary so dramatically that **M** is rarely 1em wide _or_ tall; but that’s <a href="https://www.fastcodesign.com/3028436/why-garamond-wont-save-the-government-467-million-a-year">another discussion<sup> (Co.Design)</sup></a> altogether.)

<h2>So why is it useful?</h2>

Web design actually has _two_ units based on the `em` unit; one called `em` (which is, go figure, one em) and one called `rem`, which stands for ‘root-em’ and really means, ‘the font-size of the root element’. These are incredibly useful for responsive web-design, and we’re about to see why.

Different browsers have different root-font-sizes. On your computer screen, your 12-pt type is quite considerably larger than it would appear on your phone; this is because ‘pts’, at least in web-design, are a somewhat arbitrary measurement (they’re not really; 72pt = 1in, but few displays actually adhere to that rule).

However, this means that each display will know what size to make something in order to keep it legibile; 6pt on a monitor is obnoxiously small — on a phone, it’s virtually invisible. If you rely on the root-em, then, everything will be scaled appropriately.

Here’s a quick example of this: Let’s say you have a button that has the text “Submit” and a **✓**. If you set the check-icon’s size to 20px, it may be the same size as your 12pt text on your computer, but your phone’s browser may display differently, and you’ll wind up with a mismatched icon.

By setting the icon’s height to 1em, you can be sure that no matter what the display or browser, your icon will always be the same height as a line of text.
