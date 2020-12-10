'use strict';

const {CliCommandName, CliExitCode} = require(`~/common/enums`);
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
      console.error(`Не больше 1000 публикаций`);

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
