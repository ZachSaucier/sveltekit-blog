<script>
  export let pen_title;
  export let slug;
  export let tab = 'html,result';
  export let height = 400;
  export let username = 'ZachSaucier';
  export let name = 'Zach Saucier';
</script>

<svelte:head>
  <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js" charset="utf-8"></script>
</svelte:head>

<p
  class="codepen"
  data-height={height}
  data-theme-id="47599"
  data-default-tab={tab}
  data-slug-hash={slug}
  data-user={username}
  style="height: {height}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
>
  <span>
    See the Pen <a href="https://codepen.io/{username}/pen/{slug}">
      {pen_title}
    </a>
    by {name} (<a href="https://codepen.io/{username}">@{username}</a>) on
    <a href="https://codepen.io">CodePen</a>.</span
  >
</p>
