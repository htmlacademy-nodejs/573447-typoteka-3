'use strict';

const {readFile, logger, paintMessage} = require(`~/helpers`);
const {MessageColor} = require(`~/common/enums`);
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
    logger.error(
        paintMessage(
            `An error occurred on reading mocked data: ${err.message}.`,
            MessageColor
        )
    );

    return Promise.reject(err);
  }

  return data;
};

module.exports = {
  getMockedDate,
};
