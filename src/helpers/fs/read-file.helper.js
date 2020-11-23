'use strict';

const fs = require(`fs/promises`);

const readFile = async (filePath) => {
  const content = await fs.readFile(filePath, `utf8`);

  return content;
};

module.exports = {
  readFile,
};
