export const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeItem = (key) => localStorage.removeItem(key);

export const getItem = (key) => {
  let item = localStorage.getItem(key);
  return item && JSON.parse(item);
};
