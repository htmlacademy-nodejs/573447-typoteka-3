'use strict';

const getItemByKey = (items, key, value) => {
  const itemByKey = items.find((item) => item[key] === value);

  return itemByKey || null;
};

module.exports = {
  getItemByKey,
};
