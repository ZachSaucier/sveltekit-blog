---
title: Single element shapes with gradients
date: 2014-05-14
updated: 2023-10-22
tags:
  - code
  - css
# cover_image: "/images/jefferson-santos-fCEJGBzAkrU-unsplash.jpg"
# cover_width: 16
# cover_height: 9description: An exploration into how to make CSS-only shapes with gradients and outlines.
---

## Making basic shapes

It’s easy to make CSS shapes with solid colors by using borders, but it’s more difficult to make them with gradient backgrounds. The main trick is to use pseudo elements and `overflow: hidden`` to cut out the desired shape. There are many more shapes that this technique could be applied to, include <a href="https://css-tricks.com/examples/ShapesOfCSS/">many listed here</a>, but I didn’t include them for brevity. <a href="https://codepen.io/ZachSaucier/pen/rvLsB">See them on CodePen</a>.

<span class="excerpt_marker"></span>

Special thanks to <a href="https://codepen.io/thebabydino/">Ana Tudor</a> because I took several of these shapes directly from her.

<div class="gradient rectangle"></div>

This is the base.

<div class="gradient rhombus"></div>

Added a little skew and scaled down the Y to keep in the correct proportions.

<div class="gradient triangle"></div>

Similar as above, but with the rhombus rotated and cut off using a pseudo element.

<div class="gradient octagon"></div>

Exactly the same as above, but with the `translate(50%)` taken out. For a parallelogram cut this in half by covering it up with a pseudo-element or something similar.

<div class="gradient hexagon"></div>

The same technique, but using a hexagon.

## Shape outlines

Even harder than that is it to make shapes with outlines. This is because gradients don’t like to for to their shape and we cannot really use

<div class="gradient rectangle border"></div>

Our new base.

<div class="gradient rhombus border"></div>

Nothing new so far.

<div class="triangleBorder border"></div>

Here’s where it gets interesting. The most practical way I’ve found to make a bordered triangle is to make two triangles and layer them, either using the conventional border trick (which I use here for ease) or by using Ana Tudor’s transform with `overflow: hidden` trick like I did above. With that being said, I did come up with an _extremely_ <a href="https://codepen.io/ZachSaucier/pen/olAIs">impractical way using box shadows</a> that doesn’t use pseudo elements.

<div class="parallelogram border"></div>

Sadly only shapes that can be made using one pseudo element can be done using this technique in one element. Using two elements any shape can have a border though

And that about wraps up what I have to offer on the subject. If you liked this you might also like <a href="https://codepen.io/ZachSaucier/pen/xnGmu">my box-shadow play</a>. There are probably some ghetto tricks like I linked above to do similar things with gradients/outlines, but if there is a cleaner approach for one of these please don’t hesitate to comment!

<style>
/* Gradient styling */
.gradient {
  /* Our base */
  width: 200px;
  height: 200px;
  background: linear-gradient(to bottom, #7d7e7d 0%, #0e0e0e 100%);
  margin: 50px auto;
}

.rhombus {
  transform: skew(-30deg) scaleY(0.8666);
  /* .8666 = cos(30deg) */
}

.triangle {
  background: transparent;
  /* comment to see rectangle */
  overflow: hidden;
  /**/
  margin: 0 auto;
  /* uncomment to see rhombus * outline: solid 1px red; /**/
  width: 8.66em;
  /* height*sqrt(3)/2 */
  height: 10em;
  transform: rotate(-90deg) skewY(30deg);
}

.triangle::before {
  display: block;
  /* to be able to apply width/ height/ transform */
  width: inherit;
  height: inherit;
  transform: skewY(-30deg) rotate(60deg) translate(50%);
  background: linear-gradient(to bottom, #7d7e7d 0%, #0e0e0e 100%);
  background-size: cover;
  content: "";
}

.triangle {
  transform: translateX(-50px) rotate(-90deg) skewY(30deg);
}

.hexagon {
  position: relative;
  overflow: hidden;
  background: transparent;
  /* add slash at the end of line to see the rhombus *
    outline: solid 1px red;/**/
  width: 10em;
  height: 10em;
  transform: rotate(-30deg) skewX(30deg) scaleY(0.866);
}

.hexagon::before {
  position: absolute;
  right: 6.7%;
  bottom: 0;
  left: 6.7%;
  top: 0;
  transform: scaleY(1.155) skewX(-30deg) rotate(30deg);
  background: linear-gradient(to bottom, #7d7e7d 0%, #0e0e0e 100%);
  content: "";
}

/* Border styling */
.border {
  margin: 50px auto;
}

.rectangle.border, .rhombus.border {
  background: teal;
  box-shadow: inset 0 0 0 10px black;
}

.triangleBorder {
  position: relative;
  width: 200px;
  height: 200px;
}

.triangleBorder::before, .triangleBorder::after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  top: 50%;
  left: 50%;
}

.triangleBorder::before {
  margin-top: -100px;
  margin-left: -100px;
  border-width: 200px 100px 0 100px;
  border-color: black transparent transparent transparent;
}

.triangleBorder::after {
  margin-top: -90px;
  margin-left: -80px;
  border-width: 165px 80px 0 80px;
  border-color: teal transparent transparent transparent;
}

.parallelogram {
  position: relative;
  border-bottom: 100px solid black;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  height: 0;
  width: 100px;
}

.parallelogram::before {
  content: "";
  position: absolute;
  top: 10px;
  left: -80px;
  border-bottom: 80px solid teal;
  border-left: 80px solid transparent;
  border-right: 80px solid transparent;
  height: 0;
  width: 80px;
}
</style>
