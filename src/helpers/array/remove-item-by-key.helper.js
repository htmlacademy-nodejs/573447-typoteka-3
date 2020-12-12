'use strict';

const removeItemByKey = (items, key, value) => {
  const updatedOffers = items.filter((item) => item[key] !== value);

  return updatedOffers;
};

module.exports = {
  removeItemByKey,
};
