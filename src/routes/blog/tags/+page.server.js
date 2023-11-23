import fetchTags from '$lib/utilities/fetchTags';

export const load = async () => {
  return await { tags: fetchTags() };
};
