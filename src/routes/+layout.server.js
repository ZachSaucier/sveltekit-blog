export const prerender = true;

export const load = async ({ cookies }) => {
  return {
    theme: cookies.get('theme'),
    collapsed: cookies.get('collapsed'),
    innerWidth: cookies.get('innerWidth'),
  };
};
