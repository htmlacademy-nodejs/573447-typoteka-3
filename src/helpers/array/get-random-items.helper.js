'use strict';

const {getShuffledItems} = require(`~/helpers/array/get-shuffled-items.helper`);

const RANDOM_ITEMS_START_IDX = 0;

const getRandomItems = (items, count) => {
  const randomItems = getShuffledItems(items).slice(RANDOM_ITEMS_START_IDX, count);

  return randomItems;
};

module.exports = {
  getRandomItems,
};
