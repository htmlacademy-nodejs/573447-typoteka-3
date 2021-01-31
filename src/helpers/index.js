'use strict';

const {bcrypt} = require(`./packages`);
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
const {getLogger, logger} = require(`./log`);
const {getFileExtension} = require(`./file`);
const {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  generateMockedUser,
  generateMockedUsers,
  getMockedPublicationsData,
  readPublicationsFileContent,
} = require(`./mocks`);
const {getHttpErrors} = require(`./exceptions`);
const {asyncHandler} = require(`./routes`);

module.exports = {
  bcrypt,
  logger,
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
  getLogger,
  getFileExtension,
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  generateMockedUser,
  generateMockedUsers,
  getMockedPublicationsData,
  readPublicationsFileContent,
  getHttpErrors,
  asyncHandler,
};
