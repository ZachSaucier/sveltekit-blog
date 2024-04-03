import fetchTags from '$lib/utilities/fetchTags';

export const load = async () => {
  const tags = await fetchTags();
  return { tags };
};
