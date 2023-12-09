---
title: console.delight
date: 2023-12-05
description: An article exploring the capabilities and limitations of adding HTML, CSS, JavaScript, and SVGs to the console.
tags:
  - code
  - javascript
  - css
  - svg
draft: true
---

<script>
	import ContentAside from "$lib/components/ContentAside.svelte";
  import CodePen from "$lib/components/CodePen.svelte";
  import Lightbox from "$lib/components/Lightbox.svelte";
</script>

Stop reading this article and open the console!

That's the sort of thing that I'll be talking about creating. A way to delight the curious and further your brand.

Everyone knows you can use `console.log` to log text and variables to the console. Did you know you could also render (limited) CSS, SVGs, and even HTML in it?!? I didn't!

<span class="excerpt_marker"></span>

## How to use CSS, SVGs, and HTML in a console message

Here's the magic: `%c`. It lets us render a console message (like`console.log` or `console.info`) using a bit of CSS!

<ContentAside>
  <h4>Should I use <code>console.log</code> or <code>console.info</code>?</h4>
  <p>Console logs are generally used for debugging purposes while console infos are used for information that is more relevant to end users. The only difference in terms of how they're handled by browsers are some styling differences.</p>
</ContentAside>

Let's see how it works.

Here's the `console.info` from the online version of Adobe Photoshop:

```js
console.info(
  '%c %cAdobe %cPhotoshop Web%c  %c2023.23.0.1%c  %c037a8af9746',
  "padding-left: 36px; line-height: 36px; background-image: url('data:image/gif;base64,R0lGODlhIAAgAPEBAAAAAP///wAAAAAAACH5BAEAAAIALAAAAAAgACAAAAKkhC+py3zfopxGvIsztsCGD4La2FVAGBoBuZnox45WcqLsum5KDWdvf1nwTo+fLbgDqo7LFCJJbOY0oidt6ozVKrtib0qaCnlYcJh7rf5iK6HZaM64VeS6L+pWf89WT+6vRAUBBVQ1gpOTJ4IYdxCnOBSJ8ZhkZNekk5ZSxpTpt6Y1eEVm00j3VALDmBXVyPEJB2r2ShoLh2ASqvU60dsr5yuBUQAAOw=='); background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px",
  'background: #666; border-radius:0.5em 0 0 0.5em; padding:0.2em 0em 0.1em 0.5em; color: white; font-weight: bold',
  'background: #666; border-radius:0 0.5em 0.5em 0; padding:0.2em 0.5em 0.1em 0em; color: white;',
  '',
  'background: #c3a650; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;',
  '',
  'background: #15889f; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;'
);
```

Here's what is looks like Chrome (I use dark mode):

<Lightbox src="https://res.cloudinary.com/desumhldo/image/upload/v1702131548/console-delight/console-info-chrome_iazb3v.webp" width="782" height="78" />

You can probably already guess, the `%c`s correspond to the strings that follow. Each one starts a new style section, seemingly like an `inline-block` element.

The SVG is rendered as a `data:image`. Any data image works here!

```js
console.info(
  '%c ',
  "padding-left: 300px; line-height: 200px; background-image: url('data:image/jpeg;base64,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'); background-size: 300px; background-repeat: no-repeat;"
);
```

Interestingly, a character (like the space I included to the right of the `%c` above) is required for the image to show up.

## How different browsers handle non-text content in console logs

<ContentAside>
  <p>Note: Using consoles in this way is very experimental and these results are likely to be inaccurate at some point in the future. As far as I can tell, styles in the console using <code>%c</code> like this <a href="https://console.spec.whatwg.org/#logger">is mentioned</a> in a spec but not fleshed out.
</ContentAside>

Here's what Adobe's `console.info` command looks like in various browsers:

**Safari**

The Photoshop web app doesn't support Safari (I feel you, Adobe. I feel you.) so I pasted the code directly into the Safari console to test. It just prints the raw text and ignores the CSS:

<Lightbox src="https://res.cloudinary.com/desumhldo/image/upload/v1702131549/console-delight/console-info-safari_yxertc.webp" width="1844" height="74" />

**Firefox**

**Edge**

**Chrome**

Chrome is what I used to show the original image. As such, only Chrome supports this more complicated rendering inside of console as of this time (but I hope this article will spur some other browsers to add support for this!).

In browsers that don't support this advanced rendering inside of `console.info` this just appears like an empty line in the console. That's an acceptable tradeoff in my book!

## Exploring the capabilities of non-text in the console

### My testing methodology

To explore what all we are able to do inside of a console message, I started by simply copying, pasting, and modifying `console.info`s directly in my dev tools console. Once I realized it was going to take a bit longer to explore all that I wanted to explore, I started writing the SVG in a text editor, then pasting that into Yoksel's [SVG URL encoder](https://yoksel.github.io/url-encoder/), and then pasting that into a `console.info` in the console.

However, as I continued to test, I ended up making [a CodePen](https://codepen.io/ZachSaucier/pen/GRzypKq?editors=0010) that could automatically convert my HTML SVG into a data image, put it into a `console.info`, and run it for me. This ended up saving me a good bit of effort.

### SVG capabilities

**Note:** It's important that the SVG has `xmlns="http://www.w3.org/2000/svg"`! If it doesn't, it won't render, even in Chrome.

| Capability      | Supported? |
| --------------- | :--------: |
| `<a>` tag       |     ❌     |
| External images |     ❌     |
| SMIL animation  |     ✅     |
| `foreignObject` |   ✅[^1]   |

[^1]: `foreignObject` works!! But only if `xmlns="http://www.w3.org/1999/xhtml"` is set on the outermost element. Also note that the HTML content has the same sort of restrictions that the SVG itself has, as discussed in this article (no `<a>` tags, etc.).

### CSS capabilities

| Capability                            | Supported? |
| ------------------------------------- | :--------: |
| CSS animations                        |     ✅     |
| `:hover`                              |     ❌     |
| CSS variables                         |   ✅[^2]   |
| Viewport units                        |   ✅[^3]   |
| `background-image: linear-gradient()` |     ✅     |
| `background-image: url()`             |     ❌     |

[^2]: Note that CSS variable usage _cannot_ be inherited from the scope outside of the SVG (i.e. from your webpage).
[^3]: I was very surprised to see viewport units work! They seem to use the SVG's size as the viewport upon initial inspection.

### JavaScript capabilities

| Capability                                      | Supported? |
| ----------------------------------------------- | :--------: |
| Console commands                                |     ✅     |
| DOM references within the SVG                   |     ✅     |
| DOM reference to the SVG itself                 |     ✅     |
| DOM reference outside of the SVG                |     ❌     |
| `setTimeout`                                    |     ✅     |
| "Global" variables via multiple `<script>` tags |     ✅     |
| Setting CSS variables                           |     ✅     |
| Importing external JS                           |     ❌     |
| `prompt`                                        |     ❌     |
| WAAPI                                           |     ❌     |
| `.addEventListener`                             |     ❌     |

## Some interesting effects to inspire you

So what are some things that we can make given these capabilities and limitations? Here's some ideas to inspire you!

`stroke-dashoffset` animation (line drawing animation): [this one from Cyril Levallois](https://codepen.io/CyrilLevallois/pen/eYBKKM)

```html
<tspan id="line1">thanks for</tspan>
...
<script>
  const line1 = document.querySelector('#line1');
  line1.textContent = 'test';
</script>
```

## Detecting whether or not the console is open

Reveal animations (like the first half of the TODO animation above) are one way of animating using this technique. However, these animations may finish before someone actually opens up the console. As such, I wanted to see if we can detect when the console is open so that we can wait to fire the animation until then.

There's no way to my knowledge to detect if the console itself is open (if you know of a way, please let me know!). However, there are some ways to detect if the devtools in general are open, though the way to detect that [seems to change every so often](https://stackoverflow.com/q/7798748/2065702).

I got the lightweight package [`devtools-detect`](https://github.com/sindresorhus/devtools-detect) working in a project using [this sort of setup](https://gist.github.com/ZachSaucier/ea8ebf65079febbde4f2f9190ae6644a). However, the package has many known issues/limitations, which the author notes in the README. But for the purpose of something superfluous like this it is probably okay. If you're really wanting to do this, I might recommend [detect-devtools-via-debugger-heartstop](https://github.com/david-fong/detect-devtools-via-debugger-heartstop) instead because it seems more reliable but I didn't test it myself.

## Tooling that makes this easier

- [My testing CodePen](https://codepen.io/ZachSaucier/pen/GRzypKq) which automatically generates `console.info`s for you if you paste an SVG into the HTML section.
- [css-doodle](https://css-doodle.com/) is a tool / web-component created by [Chuan](https://yuanchuan.dev/) ([@yuanchuan](https://vis.social/@yuanchuan)).
- [EZGIF](https://ezgif.com/image-to-datauri/ezgif-4-975be6affc.jpg) for converting regular images into dataURIs.

## Notable mention: CSS text effects

You can apply multiple `text-shadows` to apply a 3D text effect.

```js
console.info(
  '%cA rainbow text effect',
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
