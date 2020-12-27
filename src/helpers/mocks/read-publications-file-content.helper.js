'use strict';

const {logger, paintMessage} = require(`~/helpers/string`);
const {readFile} = require(`~/helpers/fs`);
const {MessageColor} = require(`~/common/enums`);

const readPublicationsFileContent = async (path) => {
  try {
    const content = await readFile(path);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(
        paintMessage(
            `An error occurred on reading mocked-data: can't read mocked-data from file...`,
            MessageColor.RED
        )
    );

    return [];
  }
};

module.exports = {
  readPublicationsFileContent,
};
