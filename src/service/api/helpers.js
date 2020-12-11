'use strict';

const {readFile} = require(`~/helpers`);
const {MOCKS_FILE_PATH} = require(`~/common/constants`);

const data = [];

const getMockedDate = async () => {
  try {
    if (!data.length) {
      const fileContent = await readFile(MOCKS_FILE_PATH);

      data.push(...JSON.parse(fileContent));

      return data;
    }
  } catch (err) {
    console.log(err);

    return Promise.reject(err);
  }

  return data;
};

module.exports = {
  getMockedDate,
};
