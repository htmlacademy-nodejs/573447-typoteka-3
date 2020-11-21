'use strict';

const {getRandomNumber} = require(`./number`);
const {getRandomItem, getRandomItems, getShuffledItems} = require(`./array`);
const {writeToFile} = require(`./fs`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  writeToFile,
};
