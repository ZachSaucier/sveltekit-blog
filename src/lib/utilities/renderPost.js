import { render } from 'svelte/server';

/** @param {import('svelte').Component} component */
export async function renderPostHtml(component) {
  const { body } = await render(component, { props: {} });
  return body;
}
