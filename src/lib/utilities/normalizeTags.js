/** @param {unknown} tags @returns {string[]} */
export function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === 'string') {
    return tags
      .split(/\s*[–—-]\s+/)
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}
