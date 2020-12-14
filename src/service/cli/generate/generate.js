'use strict';

const {CliCommandName, CliExitCode} = require(`~/common/enums`);
const {logger} = require(`~/helpers`);
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
      logger.error(`An error occurred on creating mocked data: No more than 1000 publications.`);
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
