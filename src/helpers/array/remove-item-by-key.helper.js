'use strict';

const removeItemByKey = (items, key, value) => {
  const updatedItems = items.filter((item) => item[key] !== value);

  return updatedItems;
};

module.exports = {
  removeItemByKey,
};
