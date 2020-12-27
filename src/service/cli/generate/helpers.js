'use strict';

const {writeToFile, paintMessage, logger} = require(`~/helpers`);
const {CliExitCode, MessageColor, MocksConfig} = require(`~/common/enums`);

const savePublicationsToFile = async (mockedPublications) => {
  try {
    await writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedPublications));

    logger.info(paintMessage(`Operation success. File with mocks was created.`, MessageColor.GREEN));
  } catch (err) {
    logger.error(
        paintMessage(
            `An error occurred on saving mocked-data: can't write mocked-data to file...: ${err.message}`,
            MessageColor.RED
        )
    );

    process.exit(CliExitCode.ERROR);
  }
};

module.exports = {
  savePublicationsToFile,
};
