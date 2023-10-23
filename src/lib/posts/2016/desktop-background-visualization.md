---
title: Creating an animated desktop background using a webpage
date: 2016-06-30
categories:
  - code
  - animation
  - projects
# coverImage: /images/linus-nylund-Q5QspluNZmM-unsplash.jpg
# coverWidth: 16
# coverHeight: 9
description: How I managed to create an animated desktop background using a webpage.
---

I love life. Relatedly, I love change (when it comes in appropriate ways), customization, and interacting with stuff. That’s a big reason why I really enjoy the work that I do, creating new and unique ways for people to interact with each other and with the content I am providing.

On a seemingly different note, I have warm memories of the screensavers from when I was kid. The brick 3D maze, the pipes, and the rainbow colored shape that kept morphing into a new shapes entranced (distracted) me as a ~7 year old in school.

Also, ever since I got into animating, I’ve wanted to include the things I make into more areas of my life. One area that has come into my mind several times was my desktop background.

<!--more-->

If you’ve looked into this subject at all, you may know that Windows used to have a way to do this called <a href="https://en.wikipedia.org/wiki/Active_Desktop">Active Desktop</a> but removed it because of the security problems it allowed. You may also know that all software that changes the desktop now does so in a static way. In fact, the only really interactive desktop software I could find is <a href="https://www.rainmeter.net/">RainMeter</a>, which is more of a tool overlay and requires that users use their programming language. The only <a href="https://www.makeuseof.com/tag/set-live-wallpapers-animated-desktop-backgrounds-windows/">video software I found</a> for the desktop accepts only video formats and seemed poorly made. None of these options satisfied me.

To be clear, I wanted something that 1) allowed a lot of customization, including the ability for me to create my own animations, 2) acts like a desktop background, not interacting with my other applications, and it gets bonus points for 3) being free and 4) being interactive.

Today I spent some time and came up with this free, fully customizable, and optionally interactive alternative (Windows only as of now – I <a href="https://apple.stackexchange.com/q/243578/189367">couldn’t figure out</a> how to do it in Applescript):

<h2>Using a webpage as a desktop background</h2>

There are tools that give more power to users of operating systems called macro-creation and automation tools. The most common ones for Windows are <a href="https://autohotkey.com/">Autohotkey</a> and <a href="https://www.autoitscript.com/site/autoit/">Autoit</a>. These tools can give us users easy access to parts of Windows that we don’t usually have access to.

Let’s see how we can use them to use a webpage as a desktop background in 4 easy steps:

1. **Download an automation software**.

In this tutorial I will use Autohotkey (AHK), but you could likely use another similar software. So <a href="https://autohotkey.com/download/">go grab one</a>. If you’re really interested in using AHK more (it’s a really powerful tool), you should go through <a href="https://autohotkey.com/docs/Tutorial.htm">a tutorial</a> and the documentation, but I should explain everything you need for the project in this article.

2. **Get some locations**.

We’re going to use a web browser as our means of running the visualization. I recommend using one that you don’t usually use so that you can run it alongside your normal browsing. Here I’m going to use <a href="https://www.opera.com/">Opera</a>, but you can use any of your choosing (or technically any program, but web browsers are the best choice in my opinion).

The only two pieces we need to know in addition to the script we will write are 1) the file path to the browser (or program) executable (a `.exe` file) that we will use and 2) the address of the webpage that we want to display as our desktop.

There are a lot of ways to obtain the file path, but mine is `"C:\Program Files (x86)\Opera Next\launcher.exe"`. Perhaps the easiest would be to right click the browser’s shortcut, click “Properties”, and then look where the “Target” is pointing.

The other piece of information needed is the URL of the animation we want to use. There are countless ones that you could use (_any_ webpage!), including a local `.html` file, but here are a few that may be good for it: <a href="https://glslsandbox.com/e#33294.3">some bubbles</a> (the one I will use in this article), <a href="https://glslsandbox.com/e#10730.0">some pleasing ambiguous shape</a>, and <a href="https://mattdesl.github.io/codevember/14.html">this generative line project</a>.

Keep in mind that the more intensive of a page you choose the more processing it will take, even running it in the background.

3. **Write** (copy) **some code**.

I’ll try to explain what’s happening using comments, which are the part that come after the semicolon (`;`). If you’re not interested in learning how it works, just take note of where the `<program location>`, `<page location>`, and `<program name>`s are so that you know where to replace them with your settings.

```
; Make the title selection a little more forgiving
; This allows us to input part of the program's title, not the whole thing
; exactly, which is helpful for when we don't get it exactly right
SetTitleMatchMode, 2

; We then run the program and open up a new window at the location we want to use
; So, I would replace <program location> with the string above and the <page location> with the URL http://glslsandbox.com/e#33294.3
; (no quotes are necessary)
; If you're using a program other than a browser, this line will be different
Run <program location> --new-window <page location>

; Now we have to wait (listen) for that command to complete, again replacing
; the parts within the brackets
; Keep in mind that the program name is case sensitive, even in the more forgiving mode!
WinWait, <program name>

; Next, now that the program is open, we double check to make sure it exists
IfWinExist, <program name>
{
    ; Then we activate or focus it
    WinActivate, <program name>

    ; We also want to make it fullscreen, so we'll send it the key to do so
    Send {F11}

    ; Lastly, we want to constantly send our window to the bottom of other windows
    ; We can do so by setting a timer that will fire every 100 milliseconds
    ; (this value can be changed to more or less often depending on performance)
    #Persistent
    SetTimer, CheckBottom, 100
    return
}

; And here we have the function we want to run every time the timer goes off
CheckBottom:
; Make sure it exists (the user may close it at some point)
IfWinExist, <program name>
  ; This is what actually moves it to the bottom of the others
  WinSet, Bottom
return
```

You can download this file without comments <a href="https://gist.github.com/ZachSaucier/c086c01aa3018e3848e6932af4d7c4da">from GitHub</a>.

And then we save it as a `.ahk` file like `bubbles-background.ahk` and we’re done with it! Now we can run it and we should get a result like the following:

<img src="https://i.imgur.com/mQLVLEi.png">

<aside class="aside">This is my first script using AHK, so if you know how ugly it is, please forgive me and let me know how it could be improved.</aside>

Also note that Autohotkey by default creates a tray icon that we can use to turn off the script at any time.

However, if we want this page to stay as our background location anytime we login we need to do one more step.

4. **Create a shortcut in the Startup folder**.

Windows has a folder to determine what programs should startup when a user logs in. The personal folder should be located in `C:\Users\<user name>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` while the shared folder should be in `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup`. Keep in mind that to view these folders you need to <a href="https://windows.microsoft.com/en-us/windows/show-hidden-files">show hidden files and folders</a>.

Now we need to create an executable for our `.ahk` file by right clicking it and selecting “Compile Script”. After a few seconds, one will be created and you need to move it to the startup folder you want it to be in – one of the ones listed above. Either should work for your current user.

**We’re done!** Now we have a working webpage as our desktop background that will start every time we login!

<aside class="aside">If you create a Mac veresion of this script, let me know and I will gladly credit you and link it in this post!</aside>

<h3>Pros</h3>

This approach has several positives. It lets users specify exactly what content they want to use, allows any type of web content, gives a lot of control as to how these pages are created, is easy to change, is **totally free**, is a miniscule file size, is only as performance intensive as we make it, and can even be made interactive just as easily as non-interactive!

<h3>Cons</h3>

This approach has some known negatives. The first is that icons are no longer accessible. This is because we are creating an overlay, not a true background, so this is unable to be fixed (as far as I know) unless we use a completely different method.

The second is that there is some flickering and it shows the desktop when the page is only partially visible. If you know what’s causing this or how to fix it, I’d love to hear it!

<h2>I’d love to hear feedback!</h2>

I think there are a lot of ways to use this approach that I haven’t thought of yet and I’d love to hear about them. I’m also always looking for ways to improve that which I make, so please don’t hesitate to comment with an improvement.

I hope you enjoy this newfound freedom and create more legendary visualizations like the ones that impacted my life!
