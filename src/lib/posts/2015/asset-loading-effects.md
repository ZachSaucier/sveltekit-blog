---
title: How to create asset loading effects
date: 2015-05-26
tags:
  - code
  - css
  - javascript
  - projects
# cover_image: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# cover_width: 16
# cover_height: 9
description: A look into how to create loading effects for images and videos.
---

<a href="https://zachsaucier.github.io/Asset-Loading-Effects/" target="_blank">Just show me the demo</a>

<a href="https://github.com/ZachSaucier/Asset-Loading-Effects/tree/master">View this project on GitHub</a>

Today I will demonstrate how to show the loading of large image and video assets and reveal those assets using custom animations once they are finished loading.

In order to show the asset loading process, we will have to make <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest">XHR requests</a> for them instead of loading them the conventional way. I will also be using <a href="https://github.com/kimmobrunfeldt/progressbar.js">ProgressBar.js</a> to make creating and animating the loaders easier.

<span class="excerpt-marker"></span>

<aside class="content_aside">
	<strong>Aside:</strong> Please keep in mind some of these animated reveals are **highly experimental** and only supported by some modern browsers. I use a fade fallback in Internet Explorer for some of the demos.
</aside>

## Basic structure

The basic structure of the code is simple. We need to create some elements, style them however we want, give them a common class, and then use some custom <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes">data-attributes</a> to specify which type each one is.

The code below is an example of all the HTML we need. The ale (asset loader effects) type attribute will be used to determine which loader to use and the ale src attribute will tell use where to fetch the image from.

```html
<!-- This example is an image -->
<div class="ale" data-ale-type="diagonal" data-ale-src="/img/url.jpg">
	<!-- This example is a video -->
	<div
		class="ale"
		data-ale-type="diagonal"
		data-ale-src="/vid/vidFile.mp4"
		data-ale-src-backup="/vid/backupVidFile.mpeg"
		data-ale-is-vid="true"
	></div>
</div>
```

First off, we need to size the images and do some other setup. Since I want them to maintain their original aspect ratio (I use all 3:2 aspect ratio assets) and be fully responsive, I’m going to use something I call <a href="https://stackoverflow.com/a/11017480/2065702">the height:0 padding trick</a>. We also want the image to take up the whole size of the element, so we’ll use a value of cover for our background size property. The other thing I’ll add is a default fade to be used when the .complete class is added.

Note that I’m using <a href="https://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html">SCSS</a> to make some of our work easier.

```scss
$transDur: 0.5s;

.ale {
	/* This sizes each asset element so that the width is 1.5 times bigger than the height.
     If changed, the positioning some sub elements will need to be changed as
     well. */
	height: 0;
	padding-bottom: 66%;

	/* This part is for the effect itself */
	background-size: cover;
	position: relative;
	overflow: hidden;

	/* Add a default fade in for every effect */
	&::after {
		z-index: 0;
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: inherit;
	}
	&.complete::after {
		opacity: 0;
		transition: $transDur * 2;
	}
}
```

Now when the loader is done, the asset should fade in!

But we don’t have a loader yet. We need to create one using some JavaScript. Here’s the basic setup for our JS. For the full version, check it out on <a href="https://github.com/ZachSaucier/Asset-Loading-Effects/blob/master/js/asset-loader.js">GitHub</a>.

```js
// The elements that are the to be used for the asset
var assetElems = document.querySelectorAll('.ale'),
	urlCreator = window.URL || window.webkitURL; // For URL creator usage later

// Add the asset loading effect for each element
[].forEach.call(assetElems, loadAsset);

// Load the asset in the way specified by the data attribute
function loadAsset(elem) {
	// Determine which loader to create
	var type = elem.getAttribute('data-ale-type'), // Must be before getProgressBarElem()
		progressBarElem = getProgressBarElem(),
		isVid =
			elem.getAttribute('data-ale-isVid') != undefined
				? elem.getAttribute('data-ale-isVid')
				: false,
		assetLoc = elem.getAttribute('data-ale-src');

	// Load the asset via XHR so that we can track the progress
	var req = new XMLHttpRequest();
	// Attach the finished load listener
	req.onload = loadFinished;
	// Attach the progress listener
	req.onprogress = loading;
	// Actually make the request
	req.open('GET', assetLoc);
	req.responseType = 'blob'; // This must be after the open - FF can't handle do it before https://bugzilla.mozilla.org/show_bug.cgi?id=1110761
	req.send();

	// Determine which progress bar to use given the data attribute and return it
	function getProgressBarElem() {
		// Choose the progress bar type based on the ale-type

		// Here we determine which ProgressBar type to use based on the given type
		// and add any other necessary settings. For the sake of brevity, I left it
		// out here. Look at the source on GitHub for the full version

		return new ProgressBar.TypeSpecifiedAbove(selector);
	}

	// Update the progress bar with the current value
	function loading(evt) {
		if (evt.lengthComputable) {
			// ProgressBar.js animates using 0.0-1.0 as a range, so we need the
			// progress in terms of that
			progressBarElem.animate(evt.loaded / evt.total);
		}
	}

	// Remove the loader when it's done and show the image or video
	function loadFinished() {
		// Currently, if it's not a video it's an image
		if (!isVid) {
			// Create a URL for the given response
			var imgUrl = urlCreator.createObjectURL(req.response);
			// Set that URL as the background of the element given
			elem.style.backgroundImage = 'url(' + imgUrl + ')';
		} else {
			var video = document.createElement('video');
			video.controls = true;
			video.src = urlCreator.createObjectURL(req.response);
			elem.appendChild(video); // Append the video since we can't do a background-video
		}

		// Finish the animation
		progressBarElem.animate(1, function () {
			// If it needs to use an SVG animation, use it. Code left out here

			// Add the "complete" class to show it's done
			elem.classList.add('complete');
		});
	}
}
```

The code above, plus some a tiny bit more to get the diagonal loader looking the way we want to, <a href="https://codepen.io/ZachSaucier/pen/xGRPwJ">gets it working!</a>

Now to add more effects, we simply add a little bit more detection in JavaScript and style them differently in our CSS.

## Creating the first demo loader

The first demo is based on <a href="https://twitter.com/michaelvillar">Michaël Villar’s</a> work that can be <a href="https://michaelvillar.s3.amazonaws.com/motion/08-photo-loading/photo-loading.mp4">seen here</a>.

This demo makes use of the CSS’ <a href="https://tympanus.net/codrops/css_reference/clip-path/">clip-path</a> property, which is **highly experimental** and only supported fairly well in Chrome currently. For Firefox and Safari we fall back to a JavaScript animation on an SVG clip path and for Internet Explorer we fall back to a plain fade in because it doesn’t any type of dynamic clip paths on HTML elements.

The basic concept is simple: initially we show a circular ring loader in the middle of the page, clip away the area outside of that ring, and cover the inside of the ring with a pseudo element. When the asset is done loading, we fade the SVG loader, shrink the pseudo element, and expand the clip path until all the asset can be seen. All of this (besides the setting of the complete class) can be done in our CSS in Chrome.

Creating the SVG with JavaScript fall back is a bit more complicated. The first thing to note is that we have to refer to our desired SVG clip path by using a url() pointing to the SVG’s ID in our CSS’s clip path property. But, since we will want to be able to use the same effect for multiple images on the same page, we can’t point to the same SVG clip path because they would all animated at the same time, which looks ugly and is not what we want.

Thus, after creating the initial version of the clip path in plain SVG to make sure it does what we want it to, we need to create a JavaScript function to generate copies of our SVG so that we can assign each element its own SVG clip path. You can view my functions doing this in the JavaScript file <a href="https://github.com/ZachSaucier/Asset-Loading-Effects/blob/master/js/asset-loader.js">on GitHub</a>.

We can then set the clip path for each element to this unique SVG clip path inside of our **getProgressBarElem** function:

```js
// If it doesn't already have an SVG clip path, isn't IE, and isn't Chrome, do this
if (elem.style.clipPath === '' && !isIE && !/chrome/.test(UA.toLowerCase())) {
	// If it's a ring type, do this
	if (type === 'ring') {
		// Set the clip path to the one dynamically generated
		var IDNum = createCircleSVG();
		elem.setAttribute('data-ale-svgid', 'circleSVG' + IDNum);
		elem.style.webkitClipPath = 'url(#clipPath' + IDNum + ')';
		elem.style.clipPath = 'url(#clipPath' + IDNum + ')';
	} // Check for other clip path types here
}
```

The last thing we have to do is start the animations on the SVG clip path after the asset has loaded. We could use <a href="https://css-tricks.com/guide-svg-animations-smil/">SMIL animations</a> to do this, but I tried it and they did not perform well and were more of a pain to use. Instead, we’re going to animate our clip paths through JavaScript, so we need some easing and animation functions. Here I’m using <a href="https://github.com/gre/bezier-easing">Bezier Easing</a> by <a href="https://greweb.me/">Gaëtan Renaudeau</a>, which I believe is what <a href="https://julian.com/research/velocity/">Velocity.js</a> uses under the hood.

```js
// Add the completed class when the asset is done loading and show the image
function loadFinished() {
	// Currently, if it's not a video it's an image
	if (!isVid) {
		// Create a URL for the given response
		var imgUrl = urlCreator.createObjectURL(req.response);
		// Set that URL as the background of the element given
		elem.style.backgroundImage = 'url(' + imgUrl + ')';
	} else {
		var video = document.createElement('video');
		video.controls = true;
		video.src = urlCreator.createObjectURL(req.response);
		elem.appendChild(video); // Append the video since we can't do a background-video
	}

	// Finish the animation
	progressBarElem.animate(1, function () {
		// An SVG fallback is only needed for these types
		if (
			type === 'ring' && // Can include other types if they also use clip paths
			!isIE && // If it's not IE
			elem.hasAttribute('data-ale-svgid')
		) {
			// If has its own SVG

			// If the variable isn't set yet
			if (mySVG === undefined) {
				// Set the variable to the SVG
				mySVG = document.getElementById(elem.getAttribute('data-ale-svgid'));

				// Also set the inner shape based on the type to make animating perform better
				if (type === 'ring') {
					myInnerShape = mySVG.getElementsByTagName('ellipse')[0];
					// Call the animation function with our given animation, duration, and easing
					animate(animateCircleClipPath, transDur * 2, BezierEasing(0.42, 0.0, 1.0, 1.0));
				} // Handle other types with clip paths here
			}
		}

		// Add the "complete" class to show it's done
		elem.classList.add('complete');
	});
}

var transDur = 500;
// Our animation function that uses RAF to animate as smoothly as possible
function animate(render, duration, easing) {
	// Render the initial state for Safari
	var start = Date.now();
	var pinit = (Date.now() - start) / duration;
	render(easing(pinit));

	// Delay our animation by the transition duration to get the same effect as in Chrome
	setTimeout(function () {
		// Animate using the given function as smoothly as possible in the duration given
		// using the given easing
		start = Date.now();
		(function loop() {
			var p = (Date.now() - start) / duration;
			if (p > 1) {
				render(1);
			} else {
				requestAnimationFrame(loop);
				render(easing(p));
			}
		})();
	}, transDur); // Delay the clip path animation until the ring is faded out
}

// The start and end values for the ring animation
var rStartXVal = 0.074,
	rStartYVal = 0.111,
	rEndXVal = 1.5,
	rEndYVal = 2.25,
	rDiffXVal = rEndXVal - rStartXVal,
	rDiffYVal = rEndYVal - rStartYVal;

function animateCircleClipPath(p) {
	// p move from 0 to 1
	// Animate the rx and ry of the ellipse with easing
	myInnerShape.setAttribute('rx', rStartXVal + p * rDiffXVal);
	myInnerShape.setAttribute('ry', rStartYVal + p * rDiffYVal);
}
```

And that’s about it! Using this method we can get the effect working in browsers support SVG or CSS clip paths on HTML like Chrome, FireFox, and Safari.

This same type of approach can be used for an SVG loader of relatively arbitrary shape. We just have to make sure that the clip path matches the shape we want and we are careful with how we animate it. In the second demo, this same approach is used with a square instead.

## Other notes

If we want to add a background color or other styling to elements with the clip path effect, we have to add a container for the clip path element like I did in the demo. If we try to style the element directly instead, whatever we add will not show until the end of the animation due to the clip path.

There is one part of the JS file that is **only for the demo**. Make sure you remove the randomly generated path in the following line if you put this on your site! It forces the asset to be loaded again, not pull from the cache which is <i>not</i> what you want.

```js
// REMOVE `+ '?' + Math.random()` IN PRODUCTION!
req.open('GET', assetLoc + '?' + Math.random(), true);
```

When multiple elements with CSS clip paths are animating in Chrome, it sometimes has some wonky rendering effects on the non-first elements. I’m unsure how to prevent this besides making sure only one visible element is being animated at a time. This will likely be fixed as browsers support the feature better.

Safari doesn’t play nicely with position:relative and clip paths. The clip paths spill over into other elements even with the overflow hidden. I had to force rendering on the GPU by using a translateZ(1px) transform for webkit browsers.

Also note that there are several IE bug fixes inside of the JavaScript. Perhaps the biggest one is that IE needs to set the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio">preserveAspectRatio</a> of our SVG loaders and the value varies depending on the effect we want. You can see where I do this in the lines that look like this example:

```js
elem.svg.setAttribute('preserveAspectRatio', 'xMinYMin');
```

Another IE error fix is that the loaders failed to render sometimes. To fix this, I force a very, very subtle background change in the loading function to force a re-render:

```js
// Update the progress bar with the current value
var toggle = true;

function loading(evt) {
	if (evt.lengthComputable) {
		// ProgressBar.js animates using 0.0-1.0 as a range, so we need the progress in terms of that
		progressBarElem.animate(evt.loaded / evt.total);
		if (isIE) {
			// Force subtle background change to fix an IE rendering issue
			document.body.style.backgroundColor = toggle ? '#F7F6E2' : '#F7F5E2';
			toggle = !toggle;
		}
	}
}
```

The last demo doesn’t show the loader for IE due to a rendering bug, possibly related to <a href="https://connect.microsoft.com/IE/feedback/details/781964/">this ticket</a>. As such, a workaround needs to be found or another type used for IE.

I have included some other well supported pure CSS reveal effects in the demos which use essentially the same approach as the diagonal type above. The code to reproduce them is on GitHub with the others.

If you create other effects using the same type of approach please let me know via <a href="https://twitter.com/ZachSaucier">@ZachSaucier</a> on Twitter!
