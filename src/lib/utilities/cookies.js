export const getCookie = (cookieName) => {
  return (document.cookie.match(`(^|;) *${cookieName}=([^;]*)`) || [])[2];
};

export const setCookie = (cookieName, value, days = 360, path = '/') => {
  let expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${cookieName}=${value};expires=${expires};path=${path};`;
};
