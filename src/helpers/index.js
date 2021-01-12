'use strict';

const {getRandomNumber} = require(`./number`);
const {
  getRandomItem,
  getRandomItems,
  getShuffledItems,
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
  getMockedPublicationsData,
  readPublicationsFileContent,
} = require(`./mocks`);

module.exports = {
  getRandomNumber,
  getRandomItem,
  getRandomItems,
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
  getMockedPublicationsData,
  readPublicationsFileContent,
};
