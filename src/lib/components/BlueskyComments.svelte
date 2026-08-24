<script>
  import { onMount } from 'svelte';

  /**
   * @typedef {Object} Props
   * @property {string | null} [bluesky] - Public Bluesky post URL (`https://bsky.app/...`) or AT-URI (`at://...`)
   */

  /** @type {Props} */
  let { bluesky = null } = $props();

  const uri = $derived(bluesky?.startsWith('at://') ? bluesky : null);
  const post = $derived(bluesky && !uri ? bluesky : null);

  let ready = $state(false);

  onMount(async () => {
    await import('bsky-comments');
    ready = true;
  });
</script>

{#if ready && (post || uri)}
  <aside class="bluesky_comments" aria-label="Bluesky comments">
    <h2>Comments</h2>
    {#if uri}
      <bsky-comments {uri}></bsky-comments>
    {:else}
      <bsky-comments {post}></bsky-comments>
    {/if}
  </aside>
{/if}

<style>
  .bluesky_comments {
    margin-top: 2rem;
  }

  .bluesky_comments h2 {
    margin-bottom: 0.75rem;
  }

  .bluesky_comments :global(.bsky-container) {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-family: var(--font-sans-serif);
    font-size: 0.95rem;
  }

  .bluesky_comments :global(.bsky-header) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    align-items: baseline;
    justify-content: space-between;
    color: var(--grayed-text);
    font-size: 0.9rem;
  }

  .bluesky_comments :global(.bsky-reply-link) {
    white-space: nowrap;
  }

  .bluesky_comments :global(.bsky-comment) {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-left: 0.85rem;
    border-left: 2px solid var(--gray-accent);
  }

  .bluesky_comments :global(.bsky-comment-header) {
    display: flex;
    gap: 0.65rem;
    align-items: center;
  }

  .bluesky_comments :global(.bsky-avatar) {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .bluesky_comments :global(.bsky-meta) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
    align-items: baseline;
    line-height: 1.3;
  }

  .bluesky_comments :global(.bsky-author) {
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
  }

  .bluesky_comments :global(.bsky-author:hover) {
    color: var(--link-color-hover);
  }

  .bluesky_comments :global(.bsky-handle),
  .bluesky_comments :global(.bsky-date) {
    color: var(--grayed-text);
    font-size: 0.85em;
  }

  .bluesky_comments :global(.bsky-date) {
    text-decoration: none;
  }

  .bluesky_comments :global(.bsky-body) {
    font-family: var(--font-serif);
  }

  .bluesky_comments :global(.bsky-body p) {
    margin: 0.35em 0;
  }

  .bluesky_comments :global(.bsky-actions) {
    display: flex;
    gap: 1rem;
    color: var(--grayed-text);
    font-size: 0.85rem;
  }

  .bluesky_comments :global(.bsky-like),
  .bluesky_comments :global(.bsky-reply) {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .bluesky_comments :global(.bsky-replies) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.75rem;
  }
</style>
