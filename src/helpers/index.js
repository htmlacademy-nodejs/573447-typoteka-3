'use strict';

const {getRandomNumber} = require(`./number`);
const {getRandomItem, getRandomItems, getShuffledItems} = require(`./array`);
const {writeToFile, readFile} = require(`./fs`);
const {paintMessage} = require(`./string`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
  getShuffledItems,
  writeToFile,
  readFile,
  paintMessage,
};
