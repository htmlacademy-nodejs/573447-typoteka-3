'use strict';

const fs = require(`fs/promises`);

const writeToFile = async (path, content) => {
  await fs.writeFile(path, content);
};

module.exports = {
  writeToFile,
};
