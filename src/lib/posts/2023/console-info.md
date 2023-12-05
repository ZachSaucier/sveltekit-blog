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

Using CSS variables:

- Inside a style tag within the SVG: Works!
- Outside the SVG (like `:root` in page's stylesheet): Doesn't work

Viewport units: Works, surprisingly! They seem to use the SVG's size as the viewport upon initial inspection.

`background-image: linear-gradient(#6af, #bdf);` works!

`background-image: url()` doesn't work

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

Referencing the SVG element: Works!

`setTimeout` works!

I tried putting a `console.log` inside of a `setTimeout` to see if it would work around the limitation. It didn't. Neither did `console.info`.

Next I tried multiple script tags and global variables. They worked!

Then I moved on to loading external scripts (I tested with GSAP). Sadly, no luck.

I then tried using `prompt` to get user input. Didn't work.

WAAPI: No go

`new Date`: Works

`.addEventListener`: No go.

## Exploring what SVG options work

\*\*It's important that the SVG has `xmlns="http://www.w3.org/2000/svg"`

Using an `<a>` tag: No go.

`stroke-dashoffset` animation (line drawing animation): Works!

SMIL animation (specifically [this one from Cyril Levallois](https://codepen.io/CyrilLevallois/pen/eYBKKM)): Works!

External images (specifically [this GIF + clip path](https://codepen.io/ZachSaucier/pen/mdvQLMz/da82fa9afda484f23e886a5d58e6b396?editors=1000)): Didn't work 🙁.

`foreignObject` doesn't work.

Setting CSS variables with JS (I tested with [this animation](https://codepen.io/ZachSaucier/pen/dZroMO)): Works!

## Detecting whether or not the console is open

Given the nature of reveal animations, I also wanted to check to see if we could detect when the console is open so that we can wait to fire the animation until then.

There's no way to my knowledge to detect if the console itself is open (if you know of a way, please let me know!). However, there are some ways to detect if the devtools in general are open, though the way to detect that [seems to change every so often](https://stackoverflow.com/q/7798748/2065702).

I got the lightweight package [`devtools-detect`](https://github.com/sindresorhus/devtools-detect) working in a project using [this sort of setup](https://gist.github.com/ZachSaucier/ea8ebf65079febbde4f2f9190ae6644a). However, the package has many known issues/limitations, which the author notes in the README. But for the purpose of something superfluous like this it is probably okay. If you're really wanting to do this, I might recommend [detect-devtools-via-debugger-heartstop](https://github.com/david-fong/detect-devtools-via-debugger-heartstop) instead because it seems more reliable but I didn't test it myself.

## My `console.info` attempt

I originally had `<text>` with "thanks for stopping by" in it. However, I noticed that this created a bit of extra space in the console:

In browsers that don't support this advanced rendering inside of `console.info` this just appears like an empty line in the console. That's an acceptable tradeoff in my book!

## Notable mention: CSS text effects

You can apply multiple `text-shadows` to apply a 3D text effect.

```js
console.info(
  '%cA rainbox text effect',
  `font-size:40px; line-height: 300px; text-shadow: -1px -1px red, 1px 1px #ff1700, 3px 2px #ff2e00, 5px 3px orangered, 7px 4px #ff5c00, 9px 5px #ff7300, 11px 6px #ff8a00, 13px 7px #ffa100, 14px 8px #ffb800, 16px 9px #ffcf00, 18px 10px #ffe600, 20px 11px #fffc00, 22px 12px #ebff00, 23px 13px #d4ff00, 25px 14px #bdff00, 27px 15px #a6ff00, 28px 16px #8fff00, 30px 17px #78ff00, 32px 18px #61ff00, 33px 19px #4aff00, 35px 20px #33ff00, 36px 21px #1cff00, 38px 22px #05ff00, 39px 23px #00ff12, 41px 24px #00ff29, 42px 25px #00ff40, 43px 26px #00ff57, 45px 27px #00ff6e, 46px 28px #00ff85, 47px 29px #00ff9c, 48px 30px #00ffb3, 49px 31px #00ffc9, 50px 32px #00ffe0, 51px 33px #00fff7, 52px 34px #00f0ff, 53px 35px #00d9ff, 54px 36px #00c2ff, 55px 37px #00abff, 55px 38px #0094ff, 56px 39px #007dff, 57px 40px #0066ff, 57px 41px #004fff, 58px 42px #0038ff, 58px 43px #0021ff, 58px 44px #000aff, 59px 45px #0d00ff, 59px 46px #2400ff, 59px 47px #3b00ff, 59px 48px #5200ff, 59px 49px #6900ff, 60px 50px #8000ff, 59px 51px #9600ff, 59px 52px #ad00ff, 59px 53px #c400ff, 59px 54px #db00ff, 59px 55px #f200ff, 58px 56px #ff00f5, 58px 57px #ff00de, 58px 58px #ff00c7, 57px 59px #ff00b0, 57px 60px #ff0099, 56px 61px #ff0082, 55px 62px #ff006b, 55px 63px #ff0054, 54px 64px #ff003d, 53px 65px #ff0026, 52px 66px #ff000f, 51px 67px #ff0800, 50px 68px #ff1f00, 49px 69px #ff3600, 48px 70px #ff4d00, 47px 71px #ff6300, 46px 72px #ff7a00, 45px 73px #ff9100, 43px 74px #ffa800, 42px 75px #ffbf00, 41px 76px #ffd600, 39px 77px #ffed00, 38px 78px #faff00, 36px 79px #e3ff00, 35px 80px #ccff00, 33px 81px #b5ff00, 32px 82px #9eff00, 30px 83px #87ff00, 28px 84px #70ff00, 27px 85px #59ff00, 25px 86px #42ff00, 23px 87px #2bff00, 22px 88px #14ff00, 20px 89px #00ff03, 18px 90px #00ff1a, 16px 91px #00ff30, 14px 92px #00ff47, 13px 93px #00ff5e, 11px 94px #00ff75, 9px 95px #00ff8c, 7px 96px #00ffa3, 5px 97px #00ffba, 3px 98px #00ffd1, 1px 99px #00ffe8, 7px 100px cyan, -1px 101px #00e8ff, -3px 102px #00d1ff, -5px 103px #00baff, -7px 104px #00a3ff, -9px 105px #008cff, -11px 106px #0075ff, -13px 107px #005eff, -14px 108px #0047ff, -16px 109px #0030ff, -18px 110px #001aff, -20px 111px #0003ff, -22px 112px #1400ff, -23px 113px #2b00ff, -25px 114px #4200ff, -27px 115px #5900ff, -28px 116px #7000ff, -30px 117px #8700ff, -32px 118px #9e00ff, -33px 119px #b500ff, -35px 120px #cc00ff, -36px 121px #e300ff, -38px 122px #fa00ff, -39px 123px #ff00ed, -41px 124px #ff00d6, -42px 125px #ff00bf, -43px 126px #ff00a8, -45px 127px #ff0091, -46px 128px #ff007a, -47px 129px #ff0063, -48px 130px #ff004d, -49px 131px #ff0036, -50px 132px #ff001f, -51px 133px #ff0008, -52px 134px #ff0f00, -53px 135px #ff2600, -54px 136px #ff3d00, -55px 137px #ff5400, -55px 138px #ff6b00, -56px 139px #ff8200, -57px 140px #ff9900, -57px 141px #ffb000, -58px 142px #ffc700, -58px 143px #ffde00, -58px 144px #fff500, -59px 145px #f2ff00, -59px 146px #dbff00, -59px 147px #c4ff00, -59px 148px #adff00, -59px 149px #96ff00, -60px 150px #80ff00, -59px 151px #69ff00, -59px 152px #52ff00, -59px 153px #3bff00, -59px 154px #24ff00, -59px 155px #0dff00, -58px 156px #00ff0a, -58px 157px #00ff21, -58px 158px #00ff38, -57px 159px #00ff4f, -57px 160px #00ff66, -56px 161px #00ff7d, -55px 162px #00ff94, -55px 163px #00ffab, -54px 164px #00ffc2, -53px 165px #00ffd9, -52px 166px #00fff0, -51px 167px #00f7ff, -50px 168px #00e0ff, -49px 169px #00c9ff, -48px 170px #00b3ff, -47px 171px #009cff, -46px 172px #0085ff, -45px 173px #006eff, -43px 174px #0057ff, -42px 175px #0040ff, -41px 176px #0029ff, -39px 177px #0012ff, -38px 178px #0500ff, -36px 179px #1c00ff, -35px 180px #3300ff, -33px 181px #4a00ff, -32px 182px #6100ff, -30px 183px #7800ff, -28px 184px #8f00ff, -27px 185px #a600ff, -25px 186px #bd00ff, -23px 187px #d400ff, -22px 188px #eb00ff, -20px 189px #ff00fc, -18px 190px #ff00e6, -16px 191px #ff00cf, -14px 192px #ff00b8, -13px 193px #ff00a1, -11px 194px #ff008a, -9px 195px #ff0073, -7px 196px #ff005c, -5px 197px #ff0045, -3px 198px #ff002e, -1px 199px #ff0017, -1px 200px red, 1px 201px #ff1700, 3px 202px #ff2e00, 5px 203px orangered, 7px 204px #ff5c00, 9px 205px #ff7300, 11px 206px #ff8a00, 13px 207px #ffa100, 14px 208px #ffb800, 16px 209px #ffcf00, 18px 210px #ffe600, 20px 211px #fffc00, 22px 212px #ebff00, 23px 213px #d4ff00, 25px 214px #bdff00, 27px 215px #a6ff00, 28px 216px #8fff00, 30px 217px #78ff00, 32px 218px #61ff00, 33px 219px #4aff00, 35px 220px #33ff00, 36px 221px #1cff00, 38px 222px #05ff00, 39px 223px #00ff12, 41px 224px #00ff29, 42px 225px #00ff40, 43px 226px #00ff57, 45px 227px #00ff6e, 46px 228px #00ff85, 47px 229px #00ff9c, 48px 230px #00ffb3, 49px 231px #00ffc9, 50px 232px #00ffe0, 51px 233px #00fff7, 52px 234px #00f0ff, 53px 235px #00d9ff, 54px 236px #00c2ff, 55px 237px #00abff, 55px 238px #0094ff, 56px 239px #007dff, 57px 240px #0066ff, 57px 241px #004fff, 58px 242px #0038ff, 58px 243px #0021ff, 58px 244px #000aff, 59px 245px #0d00ff, 59px 246px #2400ff, 59px 247px #3b00ff, 59px 248px #5200ff, 59px 249px #6900ff, 60px 250px #8000ff, 59px 251px #9600ff, 59px 252px #ad00ff, 59px 253px #c400ff, 59px 254px #db00ff, 59px 255px #f200ff, 58px 256px #ff00f5, 58px 257px #ff00de, 58px 258px #ff00c7, 57px 259px #ff00b0, 57px 260px #ff0099, 56px 261px #ff0082, 55px 262px #ff006b, 55px 263px #ff0054, 54px 264px #ff003d, 53px 265px #ff0026, 52px 266px #ff000f, 51px 267px #ff0800, 50px 268px #ff1f00, 49px 269px #ff3600, 48px 270px #ff4d00, 47px 271px #ff6300, 46px 272px #ff7a00, 45px 273px #ff9100, 43px 274px #ffa800, 42px 275px #ffbf00, 41px 276px #ffd600, 39px 277px #ffed00, 38px 278px #faff00, 36px 279px #e3ff00, 35px 280px #ccff00, 33px 281px #b5ff00, 32px 282px #9eff00, 30px 283px #87ff00, 28px 284px #70ff00, 27px 285px #59ff00, 25px 286px #42ff00, 23px 287px #2bff00, 22px 288px #14ff00, 20px 289px #00ff03, 18px 290px #00ff1a, 16px 291px #00ff30, 14px 292px #00ff47, 13px 293px #00ff5e, 11px 294px #00ff75, 9px 295px #00ff8c, 7px 296px #00ffa3, 5px 297px #00ffba, 3px 298px #00ffd1, 1px 299px #00ffe8, 2px 300px cyan, -1px 301px #00e8ff, -3px 302px #00d1ff, -5px 303px #00baff, -7px 304px #00a3ff, -9px 305px #008cff, -11px 306px #0075ff, -13px 307px #005eff, -14px 308px #0047ff, -16px 309px #0030ff, -18px 310px #001aff, -20px 311px #0003ff, -22px 312px #1400ff, -23px 313px #2b00ff, -25px 314px #4200ff, -27px 315px #5900ff, -28px 316px #7000ff, -30px 317px #8700ff, -32px 318px #9e00ff, -33px 319px #b500ff, -35px 320px #cc00ff, -36px 321px #e300ff, -38px 322px #fa00ff, -39px 323px #ff00ed, -41px 324px #ff00d6, -42px 325px #ff00bf, -43px 326px #ff00a8, -45px 327px #ff0091, -46px 328px #ff007a, -47px 329px #ff0063, -48px 330px #ff004d, -49px 331px #ff0036, -50px 332px #ff001f, -51px 333px #ff0008, -52px 334px #ff0f00, -53px 335px #ff2600, -54px 336px #ff3d00, -55px 337px #ff5400, -55px 338px #ff6b00, -56px 339px #ff8200, -57px 340px #ff9900, -57px 341px #ffb000, -58px 342px #ffc700, -58px 343px #ffde00, -58px 344px #fff500, -59px 345px #f2ff00, -59px 346px #dbff00, -59px 347px #c4ff00, -59px 348px #adff00, -59px 349px #96ff00, -60px 350px #80ff00, -59px 351px #69ff00, -59px 352px #52ff00, -59px 353px #3bff00, -59px 354px #24ff00, -59px 355px #0dff00, -58px 356px #00ff0a, -58px 357px #00ff21, -58px 358px #00ff38, -57px 359px #00ff4f, -57px 360px #00ff66, -56px 361px #00ff7d, -55px 362px #00ff94, -55px 363px #00ffab, -54px 364px #00ffc2, -53px 365px #00ffd9, -52px 366px #00fff0, -51px 367px #00f7ff, -50px 368px #00e0ff, -49px 369px #00c9ff, -48px 370px #00b3ff, -47px 371px #009cff, -46px 372px #0085ff, -45px 373px #006eff, -43px 374px #0057ff, -42px 375px #0040ff, -41px 376px #0029ff, -39px 377px #0012ff, -38px 378px #0500ff, -36px 379px #1c00ff, -35px 380px #3300ff, -33px 381px #4a00ff, -32px 382px #6100ff, -30px 383px #7800ff, -28px 384px #8f00ff, -27px 385px #a600ff, -25px 386px #bd00ff, -23px 387px #d400ff, -22px 388px #eb00ff, -20px 389px #ff00fc, -18px 390px #ff00e6, -16px 391px #ff00cf, -14px 392px #ff00b8, -13px 393px #ff00a1, -11px 394px #ff008a, -9px 395px #ff0073, -7px 396px #ff005c, -5px 397px #ff0045, -3px 398px #ff002e, -1px 399px #ff0017`
);
```

## Notable mention: ASCII art

A similar effect that has been explored more is ASCII art in the console. For example, the fairly well-known Reddit `console.log` art / ad:

```js
console.log(
  `%c
                  ,d"=≥,.,qOp,
                 ,7'  ''²$(  )
                ,7'      '?q$7'
             ..,$$,.
   ,.  .,,--***²""²***--,,.  .,
 ²   ,p²''              ''²q,   ²
:  ,7'                      '7,  :
 ' $      ,db,      ,db,      $ '
  '$      ²$$²      ²$$²      $'    Using Reddit at work? Work for Reddit.
  '$                          $'      https://www.redditinc.com/careers
   '$.     .,        ,.     .$'
    'b,     '²«»«»«»²'     ,d'
     '²?bn,,          ,,nd?²'
       ,7$ ''²²²²²²²²'' $7,
     ,² ²$              $² ²,
     $  :$              $:  $
     $   $              $   $
     'b  q:            :p  d'
      '²«?$.          .$?»²'
         'b            d'
       ,²²'?,.      .,?'²²,
      ²==--≥²²==--==²²≤--==²
`,
  `font-family: monospace`
);
```

If you're looking for some tools to generate ASCII art, [ASCII Art Archive](https://www.asciiart.eu/) has a bunch of tools to generate ASCII art, including [image to ASCII](https://www.asciiart.eu/image-to-ascii) and [text to ASCII](https://www.asciiart.eu/text-to-ascii-art).

## Go forth and delight!

I'm hoping that this article inspires many more developers to implement delightful `console.info` suprises. I think it should become a normal addition to a website!
