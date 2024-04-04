import { writable } from 'svelte/store';

export const innerWidth = writable(1200);

export const current_page = writable('');
export const recent_posts = writable([]);
