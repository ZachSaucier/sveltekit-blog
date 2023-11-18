<div class="ribbons">
  <div class="ribbon ribbon__horiz" />
  <div class="ribbon ribbon__vert" />
</div>

<style>
  .ribbons {
    --color-horiz: var(--accent);
    --color-vert: var(--accent-dark);
  }
  :global(html.dark .ribbons) {
    --color-horiz: #fff;
    --color-vert: var(--accent);
  }

  .ribbon {
    position: absolute;
    z-index: -1;

    &::before,
    &::after {
      content: '';
      position: absolute;
      transform-origin: bottom right;
    }
  }

  .ribbon__horiz {
    background-color: var(--color-horiz);
    left: 300px;
    top: 130px;
    width: calc(100% - 300px);
    height: 80px;

    @media (max-width: 749px) {
      height: 35px;
      left: 100px;
      top: 90px;
      width: calc(100% - 100px);
    }

    &::before {
      background-color: inherit;
      height: 100%;
      width: 420px;
      left: -420px;
      transform: rotate(30deg);
    }
  }

  .ribbon__vert {
    background-color: var(--color-vert);
    left: 30px;
    top: 171px;
    height: calc(100% - 171px);
    width: 80px;

    @media (max-width: 749px) {
      width: 35px;
      left: 5px;
      top: 100px;
      height: calc(100% - 100px);
    }

    &::before {
      background-color: inherit;
      width: 95%;
      height: 500px;
      top: -438px;
      left: -32px;
      transform: rotate(55deg);
    }

    &::after {
      background-color: var(--color-horiz);
      width: 100%;
      height: 92px;
      top: -68px;
      left: 164px;
      transform: skewY(30deg);
    }
  }

  /* Can't combine this with the above because it breaks in webkit at least */
  @media (max-width: 749px) {
    .ribbon__vert::before {
      top: -474px;
      left: -14px;
    }
    .ribbon__vert::after {
      height: 40px;
      top: -19px;
      left: 54px;
    }
  }
</style>
