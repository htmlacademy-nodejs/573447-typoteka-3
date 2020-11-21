'use strict';

const {
  getRandomItem,
  getRandomItems,
  getRandomNumber,
  writeToFile,
} = require(`~/helpers`);
const {CliCommandName, CliExitCode} = require(`~/common/enums`);
const {MocksConfig} = require(`./common`);

const MONTH_MILLISECONDS = 2592000000;

const generatePublication = () => ({
  title: getRandomItem(MocksConfig.TITLES),
  createdDate: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ),
  announce: getRandomItems(
      MocksConfig.TEXT.TEXTS,
      getRandomNumber(
          MocksConfig.TEXT.MIN_ANNOUNCE_COUNT,
          MocksConfig.TEXT.MAX_ANNOUNCE_COUNT
      )
  ).join(` `),
  fullText: getRandomItems(
      MocksConfig.TEXT.TEXTS,
      getRandomNumber(
          MocksConfig.TEXT.MIN_FULL_TEXT_COUNT,
          MocksConfig.TEXT.TEXTS.length
      )
  ).join(` `),
  category: getRandomItems(
      MocksConfig.CATEGORY.CATEGORIES,
      getRandomNumber(
          MocksConfig.CATEGORY.MIN_COUNT,
          MocksConfig.CATEGORY.CATEGORIES.length
      )
  ),
});

const generatePublications = (count) => {
  const generatedPublications = Array.from(new Array(count), generatePublication);

  return generatedPublications;
};

module.exports = {
  name: CliCommandName.GENERATE,
  run: (args) => {
    const [count] = args;
    const publicationsCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (publicationsCount > MocksConfig.MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);

      process.exit(CliExitCode.ERROR);
    }

    const mockedPublications = generatePublications(publicationsCount);

    writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedPublications), (err) => {
      if (err) {
        console.error(`Can't write data to file...`);

        process.exit(CliExitCode.ERROR);
      }

      console.log(`Operation success. File created.`);

      process.exit(CliExitCode.SUCCESS);
    });
  },
};
