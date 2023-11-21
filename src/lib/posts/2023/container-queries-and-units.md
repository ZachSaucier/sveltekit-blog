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
</script>

## What are container queries?

Container queries are similar to media queries but allow you to set styles based on the size of pre-defined containers in an element's ancestry tree.

This is super handy because you can write CSS in a way that gives flexibility to the layout! We no longer have to tightly couple the layout of components with how those components are styled internally. In other words, you can set up components to respond to the container size without having to know the breakpoints of the overall page layout. Yay for increased isolation!

Let's look at a quick example. Here's how I might set up my CSS _before_ container queries:

<!-- TODO -->

Note that the component has to know the breakpoints for the larger page layout to update properly. This is a pain to maintain, especially given the fact that you can't use CSS variables inside of media queries.

Here's what the above demo looks like using container queries and container query units instead:

<!-- TODO -->

Much nicer!

<ContentAside>
  <p>Container queries are separate from, but can be in used in combination with, [the `container` property](https://developer.mozilla.org/en-US/docs/Web/CSS/contain).</p>
</ContentAside>

### How to use container queries

To use container queries, you must first define what your container(s) is going to be. You do this by defining a [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) and optionally a [`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name). The value of a `container-name` is of the [`<custom-indent>`](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident) type.

You can also optionally use the `container` shorthand to define both. Such as:

```css
.my-component {
  container: my-component / inline-size;
}
```

When using a container query or container query unit (which we will cover more in later sections), it will reference the nearest container in its ancestry tree unless you specify a specific `container-name` to use.

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

Note that you _cannot_ select the container itself inside of a container query (like `.my-component {`) but you _can_ use it as a part of a more complex selector. But you don't _have to_ refer to the container element in the selector, meaning this is also valid:

```css
@container my-component (min-width: 500px) {
  p {
    font-size: 1.5rem;
  }
}
```

## What are container query units?

Container query units are an addition to the container query specification that provides units _based on the container's dimensions_. This is especially handy for sizing pieces of a component based on the component's container size.

What's more, you're not restricted to using container query units inside of container queries. You can use them anywhere that a container is specified! That means that in some cases you can get away with just setting a property's value to something that uses a container query unit and just leave it at that.

### A shortened name for container query units?

"Container query units" is kind of a mouthful to say. Given that they can be used outside of container queries (so long as a container is defined), I think we can probably just refer to these as "container units" [like Chris Coyier did](https://css-tricks.com/container-units-should-be-pretty-handy/) when he wrote about them a while back. As such, I'm going to be calling them that for the rest of this article.

### Available container units

Here's the list of container query units we currently have access to:

- `cqw`: 1% of a query container's width
- `cqh`: 1% of a query container's height
- `cqi`: 1% of a query container's inline size
- `cqb`: 1% of a query container's block size
- `cqmin`: The smaller value of either `cqi` or `cqb`
- `cqmax`: The larger value of either `cqi` or `cqb`

The width and height values are pretty straightforward.

[Inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) is equivalent to width for horizontal [writing modes](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) and equivalent to the height for vertical writing modes. The [block size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size) is the corresponding opposite.

Min and max are also fairly straightforward.

Of these, `cqi` will probably the most commonly used unit for those who want to build websites for international audiences.

## Use cases for container queries and container units

Let's take a quick look at some use cases for container queries and container units!

### Responsive layouts

Perhaps the most common use case for container queries is to change the layout of a component's internals based on the container's size. Paired with ways of doing layouts like flex and grid, it can make creating pages that respond well to different viewport sizes even easier.

<!-- TODO -->

Accessibility note: It's best to keep the logical order of things in markup.

### Adding non-vital detail when there's more space available

In addition to changing the layout, sometimes it makes sense to hide some of the less important information or decorative elements when a component is smaller. A great exactly of this is Chris Coyier's calendar layout demo:

https://codepen.io/chriscoyier/pen/jOeBzNN

### Fluid typography

Fluid typography is the concept of defining font sizes in a way where it automatically scales based on some dimension between some pre-defined bounds. In the past this has been based on the viewport width, but container query units make this concept a lot more powerful!

Check out this demo:

<!-- TODO -->

Stephanie Eckles wrote a more in-depth article about [using container query units for typography](https://moderncss.dev/container-query-units-and-fluid-typography/) that I highly recommend!

## When to use media queries instead

Content queries and units free us up from having to always use breakpoints that are tied to the layout. However, there are cases where you want content to update based on the layout! That's when you should still use media queries—so content can be updated across multiple components at the same time.

## Browser support

Container queries for sizing [have pretty solid browser support](https://caniuse.com/css-container-queries) these days, as does [container units](https://caniuse.com/css-container-query-units).

There's also discussion around creating CSS _style_ container queries. This would allow certain things to be done more easily, like alternating between nested italic and normal text. Since the values of CSS variables can also be used in style queries, they could also be used as a more legitimate alternative to [the CSS variable/custom property toggle hack](https://css-tricks.com/the-css-custom-property-toggle-trick/). But at the moment they are only partially supported [in WebKit-based browsers](https://caniuse.com/css-container-queries-style).

## Conclusion

Container queries and container units enable us to create more isolated components. This makes it easier for components to be used across multiple pages, layouts, and systems. They're prime for use in design systems!

If you're interested in what other CSS features I used when recreating my blog, check out [my blog post about the process](/blog/blog-refresh-2023)!
