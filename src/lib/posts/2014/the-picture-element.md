---
title: Proper usage of the picture element
date: 2014-09-30
tags:
  - code
  - html
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description: This post covers how you should use the picture element.
---

<div class="aside">
	<strong>Aside:</strong> This question was originally asked on WebDesign.StackExchange.com, a private beta that ended up being deleted on October 6th, 2014.
</div>

I know how to use the `<img>` element, but I’ve been hearing things about the upcoming `<picture>` element to be used for responsive images. The articles I’ve read on the subject are kind of mixed up about the usage of the `<picture>` element and I’d like to get some clarification.

How is the `<picture>` element different from the `<img>` element? Should I always use it instead of the `<img>` element given that I want all of my sites to be responsive?

<span class="excerpt-marker"></span>

<hr>

> Should I always use it instead of the `<img>` element given that I want all of my sites to be responsive?

No! The `<picture>` element is _not_ a replacement for the older `<img>` element. In fact, most of the time **_you should use the `<img>` element_**.

As Jason Grigsby says in <a href="https://blog.cloudfour.com/dont-use-picture-most-of-the-time/">his article on the subject</a>,

<blockquote>
	The ‘picture’ [specification]  contains much more than the `<picture>` element. The picture specification includes `srcset` and `sizes` and you can use those attributes without using the `<picture>` element.
</blockquote>

In essence, there are <a href="https://usecases.responsiveimages.org/">many use cases</a> for the picture specification<sup>**1**</sup>, but there are two primary ones: **resolution switching**, which is selecting a different source for the image when needed, and **art direction**, which is for most everything else like cropping, etc.

[Most of the time](https://blog.yoav.ws/2013/05/How-Big-Is-Art-Direction) we’ll just need **resolution switching**, in which case we should use the `<img>` element. _“How can this be? My `<img>`s aren’t responsive.”_ Well, <a href="https://caniuse.com/#feat=srcset">they might not yet be</a> but they should be soon, granted the following format (pulled from <a href="https://blog.cloudfour.com/dont-use-picture-most-of-the-time/">Jason Grigsby’s article</a>) is followed:

```html
<img
	sizes="(max-width: 30em) 100vw,
         (max-width: 50em) 50vw,
         calc(33vw - 100px)"
	srcset="swing-200.jpg 200w, swing-400.jpg 400w, swing-800.jpg 800w, swing-1600.jpg 1600w"
	src="swing-400.jpg"
	alt="Kettlebell Swing"
/>
```

Essentially the `srcset` is a set of images that the browser can choose from and it’ll decide which one to choose based on some calculations and, in order to have varying dimensions at different viewports, the `sizes` options given. The `src` at the bottom is a fallback for browsers that don’t support `srcset`. For more information regarding the syntax of the new properties and `<picture>` element, check out Yoav Weiss’ <a href="https://dev.opera.com/articles/native-responsive-images/">**great article**</a> on the topic.

The <a href="https://www.w3.org/html/wg/drafts/html/master/embedded-content.html#the-picture-element">`<picture>` element</a>, on the other hand, requires _you_ to specify exactly when to change out the src for a new one. This is definitely not optimal because the computer is very good at picking the right image to use and, as developers, we want to be as lazy as possible while still having the function and looks we need :P

An example of using the picture element is as follows (again pulled from <a href="https://blog.cloudfour.com/dont-use-picture-most-of-the-time/">Jason Grigsby’s article</a>)

```html
<picture>
	<source media="(min-width: 45em)" srcset="large.jpg" />
	<source media="(min-width: 32em)" srcset="med.jpg" />
	<img src="small.jpg" alt="The president giving an award." />
	<!-- Fallback -->
</picture>
```

### _“So when should I use the `<picture>` element?”_

You should use the `<picture>` element when your use case is in an <a href="https://blog.cloudfour.com/a-framework-for-discussing-responsive-images-solutions/">**art direction**</a>, meaning when you need to crop the image at different viewports or do something similar, no other time.

Feel free to start using the responsive images specification<sup>1</sup> now as both `src-set` and the `<picture>` element fallback to currently supported methods. There is also a great poly fill called <a href="https://github.com/scottjehl/picturefill">Picturefill</a> so you can use the full features on current browsers.

<sub>1. Since “picture specification” is an ambiguous, ill-used term, some people recommend that we call the spec “**responsive images specification**” instead which I believe is a good idea.</sub>
