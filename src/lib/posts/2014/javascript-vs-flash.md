---
title: Why JavaScript instead of Flash?
date: 2014-09-30
tags:
  - code
  - javascript
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description: This post covers some of the advantages that JavaScript has over Flash.
---

<aside class="content_aside">
  <strong>Aside:</strong> This question was originally asked on WebDesign.StackExchange.com, a private beta that ended up being deleted on October 6th, 2014.
</aside>

Nowadays I see that the majority of websites are using JavaScript for their animations. I remember the days when Flash was usually used to fulfill those tasks.

**Questions:**

1. What are the advantages of using JavaScript instead of Flash? Yes I know about the performance, but are the other advantages?
2. Web developers could use JavaScripts at that point in time, why did they choose Flash anyway?

<span class="excerpt-marker"></span>

<hr>

> 1. What are the advantages of using JavaScript instead of Flash? Yes I know about the performance, but are the other advantages?

Javascript performs better, is more dynamic, is more easily edited, doesn’t require any downloads, works across more platforms, and is more responsive than bulky old flash.

Modern day libraries, for example GSAP, which was made by one of the major content creators of Flash, add even more to the capabilities to JavaScript, enabling us to do things that would never have been possible using Flash. Full back-end frameworks like Node use JavaScript to further the reach and power of JavaScript and similar things will continue to be developed.

Other web technologies, such as Canvas, SVG, WebGL, and the improvements with CSS to name a few, also have removed the need for Flash because they fulfill the roles that Flash used to fill. Now we can do what we used to do but in much better ways.

Flash also is not supported on Apple products and is rapidly losing support on other mobile devices such as those owned by Android and Windows.

<sub>The next three paragraphs come from <a href="https://grantpalin.com/">Grant Palin’s</a> answer on WebDesign</sub>

A long-running issue with Flash is that it isn’t ideal for accessibility. The JavaScript route usually involves having actual content in markup, which JavaScript then manipulates. When using Flash, the content is buried within the Flash object, which is opaque. If Flash is disabled, or the appropriate plugin isn’t installed, or it malfunctions, the user has no access to the enclosed content. Conversely, a well-built webpage or application which uses JavaScript in a way that enhances content, rather than placing it, will still be accessible.

Another one is search engines. This is related to the above issue in that crawlers can’t see inside Flash objects, so can’t index the content. Conversely, if JavaScript is implemented in a way that it enhances content, crawlers can index said content, allowing search engines to more effectively display results. Apparently Google has made some progress on this issue, but still, embedding content within Flash isn’t ideal.

Granted, Flash still has its uses for presenting videos, animations, or interactive activities. JavaScript has closed the gap for certain uses such as interactive components.

> 1. Web developers could use JavaScripts at that point in time, why did they choose Flash anyway?

Javascript didn’t have the capabilities that it does now. It wasn’t supported as well and didn’t have the same functionality that modern day Javascript has. Flash was more capable because it required an additional download in which it could load things necessary to make it a better product than JavaScript

Even today Flash still has some capabilities that JavaScript doesn’t have. Things like file I/O were possible because of the downloaded client. JavaScript likely will _never_ have the ability to do the same.
