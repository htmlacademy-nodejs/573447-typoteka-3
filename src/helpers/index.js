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
const {checkIsValidByKeys} = require(`./validation`);
const {getLogger, logger} = require(`./log`);
const {getFileExtension} = require(`./file`);
const {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  getPublicationsData,
  readPublicationsFileContent,
} = require(`./mocks`);

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
  checkIsValidByKeys,
  getLogger,
  getFileExtension,
  logger,
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  getPublicationsData,
  readPublicationsFileContent,
};
