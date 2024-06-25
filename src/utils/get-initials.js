// src/utils/get-initials.js

/**
 * Returns the initials of a given name.
 *
 * @param {string} name - The full name.
 * @returns {string} The initials.
 */
export const getInitials = (name) => {
  if (!name) return '';
  const initials = name.split(' ').map(n => n[0]).join('');
  return initials.toUpperCase();
};
