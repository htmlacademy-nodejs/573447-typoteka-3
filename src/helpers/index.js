'use strict';

const {getRandomNumber} = require(`./number`);
const {getRandomItem, getRandomItems, getShuffledItems} = require(`./array`);
const {writeToFile} = require(`./fs`);
const {paintMessage} = require(`./string`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  writeToFile,
  paintMessage,
};
