---
title: An introduction to web animation
date: 2015-02-19
tags:
  - code
  - animation
  - css
  - javascript
# cover_image: /images/PLACEHOLDER_IMAGE.jpg
# cover_width: 16
# cover_height: 9
description: An overview of basic CSS and JavaScript animation of DOM elements.
---

## Intro

I’ve written a lot about animations, from <a href="https://graphicdesign.stackexchange.com/a/39665/23061">choosing the appropriate method</a> to <a href="https://zachsaucier.com/blog/blog/2014/09/30/limiting-reflow/">limiting browser reflow</a>, but have never made a any basic tutorial because I haven’t had much reason to. But now I see that it could be useful to get people started down the right track.

I highly recommend checking out my post on <a href="https://graphicdesign.stackexchange.com/questions/463/good-place-to-start-learning-web-design/46296#46296">beginning web development</a> if you’re at all interested in learning how to program for the web. It should be quite useful to you!

Throughout this tutorial I’ll be writing code in the post itself, but I am also making the assumption that you’ll follow along in a separate window using <a href="https://jsfiddle.net/">JSFiddle</a>, a web compiler of sorts. I also assume you know a tiny bit of HTML and CSS, but if you don’t you should still be able to follow along. It’d be best to make sure you’re using a modern browser as well so we don’t have to worry as much about browser prefixes.

Please branch off from the tutorial to test out things! That’s a great way to learn exactly what’s going on.

## Let’s get started!

<span class="excerpt-marker"></span>

First thing is first, we need elements to work with. Let’s create one in the HTML section and give it a class so we can select it easily later on. In a plain HTML file this is the section that would be within the `<body>` tags.

```html
<div class="rocky">Sample content</div>
```

Now we click “Run” in the top left to get it to render and it should show up.

Great! But it’s just text. Let’s see if we can fix that…

Let’s add some things to the CSS section in the top right, which is equivalent to placing it in a `<style>` or external stylesheet placed in the `<head>` of a plain HTML file:

```css
.rocky {
  width: 300px;
  height: 300px;
  background: #b41b04; /* See what I did there? :D */
  padding: 20px;
  font-size: 2rem;
}
```

Make sure to click “Run” after you finish writing your code each time.

<img src="https://i.imgur.com/0ataeO3.png" alt="a box being rendered" loading="lazy">

Awesome! We can tell exactly where our element is now. The font size units may have thrown you off a bit, for more about that <a href="https://zachsaucier.com/blog/blog/2014/09/30/responsive-units/">check this post</a>.

Let’s get onto animating then. First we’ll make a hover state. In CSS there are things called _pseudo-classes_ which help us select elements based on the current context. There <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes">are lots of them</a>, but today we’ll stick with `:hover`.

We’ll also be using a CSS property called <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform">`transform`</a>, which changes the visual aspects of the element we apply it on. Keep in mind that there are <a href="https://leaverou.github.io/animatable/">lots of animatable properties</a> that you can play around with. I encourage you to!

Feel free to take a look at the specs regarding anything I use to get insight on what they can do as well as the syntax of how to use them. One note is to try and avoid W3Schools as there are much better alternatives like Mozilla or W3C (not related to W3Schools).

```css
.rocky:hover {
  color: white;
  transform: translate(50%, 50%);
}
```

If you played around with this at all (I hope you did), you probably found the behavior is wonky and there’s no actual animation. The wonkiness is due to the fact that as soon as you hover the element, the `:hover` CSS is applied, so it moves the element 50% of its size down and to the right. Once that happens, the mouse is no longer hovering the element so it moves back to the original position.

But both of these things can be fixed by adding a property called a <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions">`transition`</a>! We want to apply it on the original state so it applies to both the regular and hovered version.

```css
.rocky {
  /* CSS from before... */
  transition: 1s;
}
```

Sick! It lives! Now most of the wonkiness is gone and it’s actually animating!

We can also make individual properties transition in at different speeds. _How_ you may ask? Like so!

```css
.rocky {
  /* CSS from before... */
  transition: 0.3s, transform 1s; /* Always put the more general before the less general */
}
```

This applies a 1 second transition on the transform property and a .3s transition for every other animatable property. We could be more specific, but for now we’ll leave it at that.

_What if we want the element to stay in the second state?_

To do this we’ll have to change our approach a bit and use the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation">`animation`</a> property. Doing so requires that we also make a `@keyframes` rule. Unfortunately we still have to include a <a href="https://stackoverflow.com/q/25110510/2065702">browser (vendor) prefix</a> for browsers like Chrome or IE. You can do something similar to the following:

```css
.rocky {
  /* CSS from before... */
  -webkit-animation: moveMe 3s forwards;
  animation: moveMe 3s forwards;
}

@-webkit-keyframes moveMe {
  25% {
    transform: translate(0, 15%);
  }
  100% {
    transform: translate(50%, 50%);
  }
}
@keyframes moveMe {
  25% {
    transform: translate(0, 15%);
  }
  100% {
    transform: translate(50%, 50%);
  }
}
```

So far I have used a _shorthand_ value for animations and transitions, which is a quicker way to write all of the values each of them has. In this example, the `forwards` value makes the animation stay in its final (100%) state.

Take note that adding an animation overrides any transitions that we have which affect the same property. Also note that we can use any percent value for individual keyframes (ex: `25%`) as well as `from` and `to`, which are equivalent to `0%` and `100%` respectively. Another note is that animations let us animate between more than two states! If you’re ever confused about which you should use, just think of <a href="https://stackoverflow.com/a/20590295/2065702">their definitions</a> and then choose the appropriate one.

_What if we want to toggle between two states on click?_

CSS does have an `:active` state which reacts to clicks, but again it only applies when the mouse is currently _being_ clicked, which isn’t exactly what we want.

As such, we’ll use the last section on our JSFiddle screen, the JavaScript section! In an HTML document this is usually placed in a `<script>` tag at the bottom of the body for loading optimization reasons.

But first we need to do some preparation with our CSS. Let’s remove the hover state and the animation stuff as well as add a class that we can toggle so that the entirity of our CSS looks something like this:

```css
.rocky {
  width: 300px;
  height: 300px;
  background: #b41b04;
  padding: 20px;
  margin-bottom: 15px;
  font-size: 2rem;
  transition: 0.3s, transform 1s;
}
.moved {
  color: white;
  transform: translate(50%, 50%);
}
```

Now we add the JavaScript:

```js
// First we have to select the element
var rocky = document.querySelector('.rocky'); // Selects the first instance of the rocky class

// Now we want to do something when it's clicked
rocky.onclick = function () {
  // Toggle the class we created
  rocky.classList.toggle('moved');
};
```

Now when we click it should toggle between the two states we created!

If you’re curious or confused, check out the documentation for <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.classList">`.classList`</a> and look at all the <a href="https://developer.mozilla.org/en-US/docs/Web/Events">other event listeners</a> we could listen for.

_What if we wanted to have several of these elements and be able to animate them all separately?_

Well, first off we need to add more copies to the HTML. We can just copy and paste the one we have a few times.

Then we have to change some stuff in our JavaScript.

```js
// Now we're selecting ALL of the rocky elements
// This variable will now be an array
var rockyElems = document.querySelectorAll('.rocky');

// Instead of just applying it to one, we have to iterate through all of them and apply the function to each
for (var i = 0; i < rockyElems.length; i++) {
  rockyElems[i].onclick = function () {
    // 'this' points to the element the onclick is called on
    this.classList.toggle('moved');
  };
}
```

Or, on modern browsers, we can do something a little bit more fancy!

```js
// We still select them the same way
var rockyElems = document.querySelectorAll('.rocky');

// Oooh, fancy
[].forEach.call(rockyElems, attatchClick);

// We need to create a function to apply the click action,
// passing in a reference to the element for it to be applied to
function attatchClick(elem) {
  elem.onclick = function () {
    this.classList.toggle('moved');
  };
}
```

A quick side note: An incredibly useful tool when working on the front end of websites is your browsers developer (“dev”) tools. Here’s a good post about <a href="https://thewc.co/articles/view/web-inspector-tutorial">how to use it for HTML/CSS</a> but its console is great for debugging JavaScript. You can read more about that <a href="https://developer.chrome.com/devtools/docs/console">here</a>. The dev tools are _incredibly_ helpful; it is **definitely** worth your time to at least pick up the basics!

<hr>

There is so much more to animations, but most all of it is built on these core things. Now it’s your time to go out and create something!

If there is anything else you’d like to see in this tutorial or another please don’t hesitate to contact me on Twitter or send me an email.

<hr>

If you enjoyed this article I think you’d love my <a href="https://css-tricks.com/css-animation-tricks/">CSS animation tricks</a> article! To see some more complex animations, you can check out <a href="https://codepen.io/ZachSaucier">my CodePen profile</a>. There are also <a href="https://graphicdesign.stackexchange.com/a/39665/23061">other ways to animate for the web</a> which you can read up on if you’re interested.
