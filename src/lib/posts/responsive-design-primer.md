---
title: 'The responsive design primer'
date: '2014-08-11'
updated: '2023-10-22'
categories:
  - 'code'
  - 'css'
  - 'responsive'
# coverImage: '/images/linus-nylund-Q5QspluNZmM-unsplash.jpg'
# coverWidth: 16
# coverHeight: 9
description: 'A primer on responsive web design, including how to use media queries, a mobile-first approach, and other techniques.'
---

<div class="aside">
    <strong>Aside:</strong> In the editing phases of this post, Brad Frost posted a great, resources driven <a href="https://bradfrost.com/blog/post/the-principles-of-adaptive-design/">article</a> on the same issue. I recommend reading it and using the resources provided as they give more detail to certain areas which this post doesn’t talk much about. 
</div>

<p>Countless articles, many quite useful, have been written on the subject of responsive design since Ethan Marcotte’s <a href="https://alistapart.com/article/responsive-web-design/">post that started it all</a>, but finding one that directly helps people understand some specific techniques while also explaining the <em>why</em> behind each action and decision is exceedingly hard. I’ll try my best to do so concisely here.</p>

<hr>

<h2>First things first. What is “responsive design”?</h2>

<p><em>Design:</em> making plans and decisions about how something will be created [<a href="https://www.merriam-webster.com/dictionary/design">1</a>].</p>

<!--more-->

<p><em>Responsive:</em> reacting in a desired or positive way, or quick to react [<a href="https://www.merriam-webster.com/dictionary/responsive?show=0&amp;t=1405636347">2</a>].</p>

<p>Responsive design, therefore, is simply the mix of the two: crafting our applications and websites in such a way that the user’s experience is tailored to him regardless of the device he is viewing it on.</p>

<h2>Yeah, great, but how do I do that?</h2>

<p>Well, the easiest way to get the best results is to start with the essentials. We must start the design process with a <strong>mobile-first</strong> (that is, in order, not in importance) mindset. By beginning with the smallest screen size that we plan to support, we know we’re giving attention to the most vital aspects of our site or app, and the rest is gravy.</p>

<p>Before taking the mobile-first approach to design, I found that the hardest part of designing my websites was either getting all of my awesome features to squish down to a smaller size or choosing which content to show. By focusing on the lowest common denominator during the vital planning stages, we are forced to create a well thought-out hierarchy of the importance of each feature, and determine how the most important feature(s) can be feasible for devices with the least screen real-estate.</p>

<p>It’s a lovely thing when we know we’ve got the most important things covered right off the bat! Adding more for larger screens is a lot more fun (and easier) than subtracting elements or re-configuring them to be smaller. Designing mobile-first will likely feel weird when you first try it — I know it did for me — but I assure you that you’ll be glad you did in the end. After building my first mobile-first site, I was astounded at how easy it had been to make responsive and how clean the result was.</p>

<p>And as I mentioned before, <strong>mobile-first</strong> should never be thought of as <strong>mobile-most-important</strong>, which would imply that so long as we get it working on phones and tablets we’ll be okay. Instead, think of it as <strong>smaller-first</strong>, or <strong>smaller-then-larger</strong> in temporal order of consideration.</p>

<p>Additionally, while we should plan first for smaller screens, the exact dimensions must be ambiguous. Don’t design for particular devices, or simply for 320px, 480px, and 768px &amp; up. Create a framework that scales naturally and has breakpoints wherever the content dictates. I appreciate how Brad Frost named his (awesome) <a href="https://github.com/bradfrost/ish.">viewport testing tool</a> “ish” because websites really should just have an –<em>ish</em> type of feel: small-ish, medium-ish, large-ish, and really large-ish.</p>

<p>But in practice, how can we tell our computers to do a certain layout at a medium-ish screen size? We’ll need to add something to our toolbox to do that well.</p>

<h3>Media queries in practice</h3>

<p>Let’s face it, there are countless screen sizes and more are being developed every day. We can’t possibly serve everyone’s individual device dimensions efficiently. But the great thing is that for a few years now we don’t have to!</p>

<p>If you have ever read through the Mozilla docs on the subject (which I suggest doing for any new feature you come across), you may have come across the <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries#Pseudo-BNF_(for_those_of_you_that_like_that_kind_of_thing">options list</a> and thought, “Goodness, there are so many options!” There certainly are, but it’s better to have too many media query options than too few. In day-to-day web design, I tend to stick with only <code>min-width</code> and, less often, <code>max-width</code>.</p>

<p>Back to what we were talking about, in practice I like to develop with a smaller-first approach. In CSS that means that we try to stick with something like the following structure:</p>

```css
/* Small-ish screen dimensions */
/* ... Some styles for the smallest viewport ... */

@media screen and (min-width: $small-medium-ish) {
	/* ... New styles / overriding some old ones ... */
}
@media screen and (min-width: $medium-ish) {
	/* ... New styles / overriding some old ones ... */
}
@media screen and (min-width: $large-ish) {
	/* ... New styles / overriding some old ones ... */
}
@media screen and (min-width: $extra-large-ish) {
	/* ... New styles / overriding some old ones ... */
}
```

<p>We declare styles first for the smallest screen, only afterwards changing them when we need to, using simple media queries. Some styles will never be changed throughout, others will change once or twice, and some may even need to change at each breakpoint. <strong>Note:</strong> The number of breakpoints should be determined by the content, though we should try to stick to the minimum necessary.</p>

<p>Of course, using names like <code>$small-ish</code> in our media queries will not work unless we hard-code them ourselves, using a pre-processor like SASS or LESS. So what should those values be?</p>

<p>Well, that depends completely on <em>your project</em>. They should be set to the values that you need to make your layout scale well and look good at each screen size. Anyone who tells you to always use a particular set of breakpoints is doing your sites a disservice. In fact, practically all modern front-end frameworks include easy-to-change settings wherein you can set project-wide breakpoints for their built-in components extremely easily. It’s freeing to think that there is no correct answer — rather, there are several.</p>

<p>With that being said, here are some guidelines:</p>

<p><strong>Use as few media queries as possible.</strong> The more queries are in your site, the messier it is, and each additional breakpoint adds less value than the last. Sufficient simplicity is sublime.</p>

<p><strong>Stick to a convention.</strong> If you’re a full-time web developer, having an entirely new media query set for each site can become very difficult to keep track of. Figure out a system that works well for you, and stick with it. I recommend keeping track of up to three common sets of media queries – one for simple sites, one for fairly complex sites, and one for sites that need very flexible styling.</p>

<p>Furthermore, within each project, make a determined effort to stick with the media queries that you set initially. Only if something important <em>cannot be done</em> using only the pre-chosen media queries, then adding a media query for a particular element or a page-specific style once in a while could be acceptable. If you find yourself doing this often, then you should consider using a different (perhaps larger) set of media queries in the first place.</p>

<p>Using <a href="https://getbootstrap.com/css/#grid-media-queries">Bootstrap’s media queries</a> is a good starting point, but feel free to branch out, depending on the site’s needs.</p>

<h2>Various responsive techniques</h2>

<h3>Size Categories</h3>

<p>As I mentioned before, with the smaller-first approach we get to start with what’s most important and add more content as we get to larger screen sizes. Let’s establish a guideline for what should be included for each breakpoint. Each section builds on the previous, following the smaller-first approach.</p>

<h4>Small-ish:</h4>

<ul>
<li>Text content essentials targeted towards your user-goal for the page (you <em>do</em> have a defined purpose for each page, right?)</li>
<li>Minimalist navigation (if necessary at all), such as a drop-down or off-canvas menu, to maximize usable screen real-estate</li>
<li>Usage of only essential images, video, and other complex media</li>
<li>Only one to two columns of copy per page</li>
</ul>

<h4>Medium-ish:</h4>

<ul>
<li>More text is allowed, and items that are lower on the importance scale begin to appear</li>
<li>Either a full menu or a mobile-targeted menu is acceptable</li>
<li>Sidebars and aside content are optional</li>
<li>If <strong>absolutely necessary</strong>, sections with content from social networks can be added</li>
<li>Greater use of images, video, and other intense media</li>
<li>Up to 4 columns per page</li>
</ul>

<h4>Large-ish:</h4>

<ul>
<li>Full text can be shown for important sections, with concise, useful aside content also available</li>
<li>Offer a full menu, but have sub-menus <em>only</em> if you must display a large number of links</li>
<li><strong>Full</strong> use of images, video, and other intense media</li>
<li>Up to 6 content columns, though negative space is still as vital as ever</li>
</ul>

<h3>Containers</h3>

<p>Containers are elements that contain other content-filled elements and extend to the full width of the browser (or a percentage width other than 100% if you have a sidebar). Often, they also have a <code>max-width</code> value of 960px, 1000px, or something similar. After that max is reached, center the container or align it to the side, depending on your design.</p>

<h3>Grid system</h3>

<p>My recommendation: don’t build your own grid system. There are a lot of good ones out there that are quite responsive, allowing for various sizes, and (best of all) already built! The best ones make use of a preprocessor to allow the values to be changed easily. The big frameworks like Bootstrap and Foundation have good ones, but if you’re looking to only get the grid system part you can get theirs from the source or use <a href="https://www.google.com/search?q=responsive+grid+system&amp;rlz=1C1CHFX_enUS576US576&amp;oq=responsive+grid+system&amp;aqs=chrome..69i57j69i65l3j0l2.3484j0j4&amp;sourceid=chrome&amp;es_sm=122&amp;ie=UTF-8">one of many</a> stand alone grid systems (<em>Note: I have not tested most of these</em>).</p>

<h3>Text sections</h3>

<p>There are a couple of good ways to layout text sections in a responsive way.</p>

<p>The first is to <strong>assign them a percentage width</strong> of their parent. This works in most cases, especially when there are large sections of text. To some extent, this can also work with images, as long as the images are at least as wide as the element ever gets.</p>

<p>The second way is to use a set of pixel widths that are dependent on the screen’s width. This method is valid but less common. In implementation, this looks similar to the media query example but uses pixel widths instead. It is beneficial in cases where you need to be able to plan exactly how it looks at any time since it can be only one of a few options.</p>

<h3>Fonts</h3>

<p>There is no need to change fonts much for responsive design. Try to keep font size at around 16px (or the equivalent in <code>em</code>, <code>rem</code>, etc.) with a minimum of 14px for body text. You’ll likely want to resize headings to be smaller on smaller screens and slightly larger on larger screens. Ensure that your <code>line-height</code> setting is unit-less, so that it scales with the font-size (i.e. <code>line-height: 1.4</code>).</p>

<p>Also note that the following meta tag should be used to render the page at the width of its screen. It is recommended to use it for all <em>reponsive</em> web pages.</p>

<pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
</code></pre>

<h2>Other notes</h2>

<p><strong>Test on actual devices.</strong> Simply resizing your desktop browser does <em>not</em> adequately simulate using your site on a mobile device. There are countless quirks of iOS, Android, and other browsers of all versions, so make sure you see what most users will see.</p>

<p><strong>Avoid Javascript</strong> when doing layouts and sizing. Only use them for sizing or layouts if <em>absolutely necessary</em>, and even then do so only for progressive enhancement rather than vital features. CSS has evolved to the point where use of Javascript is almost entirely unnecessary for layout purposes.</p>

<p><strong>Avoid tables</strong> for anything other than data. Tables are not meant for doing layouts of whole pages. When the web began, we used them because we had to. They are hard to manipulate and inflexible, to say the least.</p>

<p><strong>Use <code>box-sizing: border-box</code></strong>, on all projects, including the <code>-webkit-</code> and <code>-moz-</code> prefix for older browsers.  It makes using width and padding far more intuitive and behave like it should.</p>

<hr>

<h2>How to be <em>fully</em> responsive</h2>

<p>All that I’ve covered so far only covers which content will be displayed at what point. This is a great start, but in order to reach all platforms we may have to <em>change</em> our content depending on the context of the user’s device. This means that at times we need to learn how to use new technologies for old browsers, but have a fallback for browsers that don’t support our feature; serve differently sized images on a per-device basis; how to serve content for disabled persons; or even go as far as catering to a user’s background or location in order to give them the best experience possible.</p>

<p>We can also learn to use tools that make designing, prototyping, and building responsively easier. These include using frameworks like Bootstrap or Foundation, backend structures to make templating easier, using a CSS preprocessor, and learning how to prototype designs quickly.</p>

<p>I hope you’ve found this primer helpful. Have I missed anything important? I’d love to hear your response via a Tweet or an email.</p>

<p><strong>2016 edit</strong>: I recently released a CSS-Tricks post on <a href="https://css-tricks.com/scaling-responsive-animations/">scaling responsive animations</a> that provides some specific techniques for how to scale responsive components that may be useful!</p>
