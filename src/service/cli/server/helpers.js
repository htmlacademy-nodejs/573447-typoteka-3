'use strict';

const {readFile} = require(`~/helpers`);
const {MOCKS_FILE_PATH} = require(`./common`);

const getMocks = async () => {
  const fileContent = await readFile(MOCKS_FILE_PATH);

  const mocks = JSON.parse(fileContent);

  return mocks;
};

module.exports = {
  getMocks,
};
