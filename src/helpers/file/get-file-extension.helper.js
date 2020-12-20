'use strict';

const path = require(`path`);

const getFileExtension = (fileName) => {
  const fileExtension = path.parse(fileName).name;

  return fileExtension;
};

module.exports = {
  getFileExtension,
};
