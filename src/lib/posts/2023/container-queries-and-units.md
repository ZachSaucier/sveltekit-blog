---
title: Container queries and container units
date: 2023-11-25
description: An up-to-date article about why and how to use CSS container queries and container query units.
tags:
  - code
  - css
  - responsive
draft: true
---

<script>
	import ContentAside from "$lib/components/ContentAside.svelte";
  import CodePen from "$lib/components/CodePen.svelte";
  import Lightbox from "$lib/components/Lightbox.svelte";
</script>

## What are container queries?

Container queries are similar to media queries but allow you to set styles based on the size of pre-defined containers in an element's ancestry tree.

This is super handy because you can write CSS in a way that gives flexibility to the layout! We no longer have to tightly couple the layout of components with how those components are styled internally.

In other words, you can set up components to respond to the container size without having to know the breakpoints of the overall page layout. Yay for increased isolation!

<span class="excerpt_marker"></span>

Let's think about a theoretical example to illustrate this. Pulling from [Michelle Barker's helpful MDN article about container queries](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/), here's a mockup:

<Lightbox src="https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/layout-desktop-01.webp" width="1600" height="1142" />

When there's more width available, each article preview has the image on the left and copy on the right. When there's less room available, it stacks the image on top of the content.

Without container queries, we'd have to specify all of the cards that we want to have the vertical layout, which ones should have the horizontal layout, and which should have a bigger image explicitly. When you consider all possible screen sizes and container layouts, this quickly becomes quite complicated.

Additionally, if there's a possibility for the sidebar to be collapsed or if you sometimes need to show additional content (like ads) alongside this content, it gets even more complex! Not to mention when the layout gets changed to something else, like switching from 4 columns to 3, you have to go back and adjust everything.

Container queries can help us more easily address this sort of situation in a much more manageable way!

<ContentAside>
  <p>Container queries are separate from, but can be in used in combination with, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/contain">the <code>container</code> property</a>. The <code>container</code> property is useful for controlling how overflow is rendered.</p>
</ContentAside>

### size vs inline-size

Before diving further into container queries, it's important to make sure we have a good understanding of block and inline sizing as it has a large impact on the `container-type` and the container unit(s) that we use.

[Inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) is equivalent to width for horizontal [writing modes](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) and equivalent to the height for vertical writing modes. The [block size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size) is the corresponding opposite.

Make sure you keep this in mind!

### How to use container queries

To use container queries, you must first define what your container is going to be. You do this by defining a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) and optionally a [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name).

The `container-type` can have a value of `size`, `inline-size`, or `normal`. `size` establishes a query container for the inline and block dimensions as well as for style (which we will talk about at the end of this article). `inline-size` establishes a query container for the inline dimensions as well as for style. `normal` establishes a query container only for style.

One potential gotcha is that if you use `container-type: size` you need to add an explicit height. It will ignore the height of children elements. This is [how it is specced](https://drafts.csswg.org/css-contain-2/#containment-size) to behave.

Most often, using `container-type: inline-size` probably makes the most sense.

The `container-name` is a value of the [`<custom-indent>`](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident) type.

You can also optionally use the `container` shorthand to define both properties. Such as:

```css
.my-component {
  container: my-component / inline-size;
}
```

When using a container query or container query unit (which we will cover more in later sections), it will reference the nearest container in its ancestry tree unless you specify a particular container by including the `container-name`.

Once you've defined a container, you can use a `@container` query and select any descendant elements inside of it. For example:

```css
@container (min-width: 500px) {
  .my-component p {
    font-size: 1.5rem;
  }
}
```

Or, if you want to use the container name in the query:

```css
@container my-component (min-width: 500px) {
  .my-component p {
    font-size: 1.5rem;
  }
}
```

Note that you _cannot_ select the container itself inside of a container query (like `.my-component {` in this case) but you can use it as a part of a more complex selector as seen above.

But you don't _have to_ refer to the container element in the selector, meaning this is also valid:

```css
@container my-component (min-width: 500px) {
  p {
    font-size: 1.5rem;
  }
}
```

## orientation and aspect-ratio

Instead of using explicit container sizes for container queries, we can also make use of `orientation` and its more generic form, `aspect-ratio`.

For example, here's [a CodePen](https://codepen.io/ZachSaucier/pen/JjxeEyG?editors=1100) that shows a card where we have the image on the left for larger screens and on top for smaller screens (a non-aspect ratio version of this sort of thing is [in the section below](#changing-a-components-layout-based-on-how-much-space-is-available)).

When using `aspect-ratio`, remember that it's width divided by the height, so `aspect-ratio < 1/1` would be when the width is larger than the height (this example is equivalent to `orientation: landscape`). You can also use `min-aspect-ratio` or `max-aspect-ratio` instead of plain `aspect-ratio` and a comparison symbol if you'd like.

Note that `orientation` and `aspect-ratio` can only be used with a `container-type` of `size` because it uses the container's width and height.

## What are container query units?

Container query units are an addition to the container query specification that provides units _based on the container's dimensions_. This is especially handy for sizing pieces of a component based on the component's container size.

What's more, you're not restricted to using container query units inside of container queries. You can use them anywhere that a container is specified! That means that in some cases you can get away with just setting a property's value to something that uses a container query unit and just leave it at that.

### A shortened name for container query units?

"Container query units" is kind of a mouthful to say. Given that they can be used outside of container queries (so long as a container is defined), I think we can probably just refer to these as "container units" [like Chris Coyier did](https://css-tricks.com/container-units-should-be-pretty-handy/) when he wrote about them a while back. As such, I'm going to be calling them that for the rest of this article.

### Available container units

Here's the list of container units we currently have access to:

- `cqw`: 1% of a query container's width
- `cqh`: 1% of a query container's height
- `cqi`: 1% of a query container's inline size
- `cqb`: 1% of a query container's block size
- `cqmin`: The smaller value of either `cqi` or `cqb`
- `cqmax`: The larger value of either `cqi` or `cqb`

The width and height values are pretty straightforward to use. However, keep in mind that `cqh` will only use a container height if the container has a `container-type` of `size`. If `inline-size` is used, it will base its height on the nearest container with `container-type: size`, which might be the viewport.

Of these units, `cqi` will probably the most commonly used unit for those who want to build websites for international audiences. For horizontal languages, it is equivalent to `cqw`. But it automatically switches to use `cqh` for vertical languages.

If you're still not sure what inline means vs block here, maybe spend more time in the [section above](#size-vs-inline-size).

## Use cases for container queries and container units

Let's take a quick look at some use cases for container queries and container units!

### Changing a component's layout based on how much space is available

Perhaps the most common use case for container queries is to change the layout of a component's internals based on the container's size. Paired with ways of doing layouts like flex and grid, it can make creating pages that respond well to different viewport sizes even easier.

<CodePen pen_title="Container queries and units - Card example" slug="MWLzJGM" tab="result" />

Accessibility note: It's best to keep the logical order of elements in the markup.

Taken to an extreme, you can make HTML and CSS components function kinda like an SVG [like Dan Christofi did](https://codepen.io/danchristofi/pen/QWxameQ).

### Adding non-vital detail when there's more space available

In addition to changing the layout, sometimes it makes sense to hide some of the less important information or decorative elements when a component is smaller.

A great exactly of this is Chris Coyier's calendar layout demo:

<CodePen pen_title="Container Query Calendar" slug="jOeBzNN" username="chriscoyier" name="Chris Coyier" tab="result" />

### Fluid typography

Fluid typography is the concept of defining font sizes in a way where it automatically scales based on some dimension between some pre-defined bounds. In the past this has been based on the viewport width, but container query units make this concept a lot more powerful!

Check out this demo by Chris Coyier:

<CodePen pen_title="resizeasaurus with container units" slug="GREQGQY" username="chriscoyier" name="Chris Coyier" tab="result" />

Stephanie Eckles wrote a more in-depth article about [using container query units for typography](https://moderncss.dev/container-query-units-and-fluid-typography/) that I highly recommend!

## When to use media queries instead

Content queries and units free us up from having to always use breakpoints that are tied to the layout. However, there are cases where you want content to update based on the layout! That's when you should still use media queries—so content can be updated across multiple components at the same time.

Another time to use media queries is when you're wanting to check certain features, such as `@media (not(hover)) { ... }` or `@media (not (color)) { ... }` (which checks if the display is monochrome).

## Browser support and style queries

Container queries for sizing [have pretty solid browser support](https://caniuse.com/css-container-queries) these days, as do [container units](https://caniuse.com/css-container-query-units).

There's also discussion around creating _style_ container queries. This would allow certain things to be done more easily, like alternating between nested italic and normal text. Since the values of CSS variables can also be used in style queries, they could also be used as a more legitimate alternative to [the CSS variable/custom property toggle hack](https://css-tricks.com/the-css-custom-property-toggle-trick/). But at the moment they are only partially supported [in WebKit-based browsers](https://caniuse.com/css-container-queries-style).

## Conclusion

Container queries and container units enable us to create more isolated components. This makes it easier for components to be used across multiple pages, layouts, and systems. They're prime for use in design systems!

If you're interested in what other new CSS features I used when recreating my blog, check out [my blog post about the process](/blog/blog-refresh-2023)!

### Bonus demo

This demo by SitePoint shows responsive layout paired with container queries to inspire you further!

<CodePen pen_title="CodePen Home
Container Queries for Cards" slug="mdzJJaX" username="SitePoint" name="SitePoint" tab="css,result" />
