'use strict';

const fs = require(`fs/promises`);

const readFile = async (filePath) => fs.readFile(filePath, `utf8`);

module.exports = {
  readFile,
};
