const setItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const removeItem = (key) => localStorage.removeItem(key);

const getItem = (key) => {
  let item = localStorage.getItem(key);
  return item && JSON.parse(item);
};

const storageMethods = { getItem, setItem, removeItem };

export default storageMethods;
