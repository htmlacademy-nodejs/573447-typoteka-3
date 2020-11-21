'use strict';

const fs = require(`fs`);

const writeToFile = (path, content, cb) => fs.writeFile(path, content, cb);

module.exports = {
  writeToFile,
};
