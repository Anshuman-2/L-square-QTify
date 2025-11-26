// src/helpers/helpers.js

export const truncate = (str, max) => {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
};
