'use strict';

const getUniqueItems = (items) => {
  const uniqueItems = Array.from(new Set(items));

  return uniqueItems;
};

module.exports = {
  getUniqueItems,
};
