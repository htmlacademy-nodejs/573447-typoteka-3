'use strict';

const {getRandomItem, getRandomItems, getRandomNumber} = require(`~/helpers`);
const {CliCommandName, CliExitCode} = require(`~/common/enums`);
const {MONTH_MILLISECONDS, MocksConfig} = require(`./common`);
const {savePublicationsToFile} = require(`./helpers`);

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
  async run(args) {
    const [count] = args;
    const publicationsCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    if (publicationsCount > MocksConfig.MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);

      process.exit(CliExitCode.ERROR);
    }

    const mockedPublications = generatePublications(publicationsCount);

    savePublicationsToFile(mockedPublications);
  },
};
