import { writable } from 'svelte/store';

export const current_page = writable('');
export const recent_posts = writable([]);
