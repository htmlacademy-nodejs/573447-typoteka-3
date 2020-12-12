'use strict';

const {getRandomItem} = require(`./get-random-item.helper`);
const {getRandomItems} = require(`./get-random-items.helper`);
const {getShuffledItems} = require(`./get-shuffled-items.helper`);
const {getUniqueItems} = require(`./get-uniques-items.helper`);
const {getItemByKey} = require(`./get-item-by-key.helper`);
const {removeItemByKey} = require(`./remove-item-by-key.helper`);

module.exports = {
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  getUniqueItems,
  getItemByKey,
  removeItemByKey,
};
