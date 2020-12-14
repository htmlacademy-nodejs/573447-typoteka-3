'use strict';

const {logger, paintMessage} = require(`~/helpers`);
const {CliCommandName, CliExitCode, MessageColor} = require(`~/common/enums`);
const {
  generatePublications,
  savePublicationsToFile,
  getPublicationsData,
} = require(`./helpers`);
const {MocksConfig} = require(`./common`);

module.exports = {
  name: CliCommandName.GENERATE,
  async run(args) {
    const [count] = args;
    const publicationsCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (publicationsCount > MocksConfig.MAX_COUNT) {
      logger.error(
          paintMessage(
              `An error occurred on creating mocked data: No more than 1000 publications.`,
              MessageColor.RED
          )
      );
      process.exit(CliExitCode.ERROR);
    }

    const {titles, descriptions, categories, comments} = await getPublicationsData();
    const mockedPublications = generatePublications({
      count: publicationsCount,
      titles,
      descriptions,
      categories,
      comments,
    });

    await savePublicationsToFile(mockedPublications);
  },
};
