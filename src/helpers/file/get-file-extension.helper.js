'use strict';

const FILE_EXTENSION_SEPARATOR = `.`;

const getFileExtension = (fileName) => {
  const fileExtension = fileName.split(FILE_EXTENSION_SEPARATOR).pop();

  return fileExtension;
};

module.exports = {
  getFileExtension,
};
