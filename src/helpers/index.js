'use strict';

const {getRandomNumber} = require(`./number`);
const {getRandomItem, getRandomItems, getShuffledItems} = require(`./array`);
const {writeToFile, readFile} = require(`./fs`);
const {paintMessage, getRandomId} = require(`./string`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  writeToFile,
  readFile,
  paintMessage,
  getRandomId,
};
