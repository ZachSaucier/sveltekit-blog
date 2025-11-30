<script>
  import MainNav from '$lib/components/MainNav.svelte';

  export let style = '';

  const focusMain = () => {
    const main = document.querySelector('main');
    main.focus();
  };
</script>

<header {style} data-pagefind-ignore="all">
  <a on:click|preventDefault={focusMain} class="skip_to_content" href="#main">
    Skip to main content
  </a>

  <div class="site_title_wrapper">
    <a href="/blog">
      <h1>Musings</h1>
    </a>
    <h2>Zach Saucier's thoughts</h2>
  </div>

  <MainNav />
</header>

<style>
  .skip_to_content {
    position: absolute;
    top: -6rem;
    left: 0;
    padding: 0.5rem;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    background-color: var(--text-color);
    color: var(--background-color);

    &:focus {
      opacity: 1;
      transform: translateY(0);
      z-index: 2;
    }
  }

  header {
    padding-right: 25px;
  }

  .site_title_wrapper {
    text-align: right;
    padding: 22px 0 23.6px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 749px) {
      gap: 3px;
      padding: 10px 0 20px 0;
    }
  }

  h1 {
    font-size: 2.5rem;
    text-decoration: none;
    color: var(--button-dark-background);

    @media (max-width: 749px) {
      font-size: 1.7rem;
    }
  }

  h2 {
    font-size: 1.2rem;
    color: var(--grayed-text);

    @media (max-width: 749px) {
      font-size: 0.9rem;
    }
  }
</style>
