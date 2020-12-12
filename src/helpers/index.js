'use strict';

const {getRandomNumber} = require(`./number`);
const {
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  getUniqueItems,
  getItemByKey,
  removeItemByKey,
} = require(`./array`);
const {writeToFile, readFile} = require(`./fs`);
const {paintMessage, getRandomId} = require(`./string`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  getUniqueItems,
  getShuffledItems,
  getItemByKey,
  removeItemByKey,
  writeToFile,
  readFile,
  paintMessage,
  getRandomId,
};
