'use strict';

const {getRandomItem, getRandomItems, getRandomNumber} = require(`~/helpers`);
const {CliCommandName, CliExitCode} = require(`~/common/enums`);
const {savePublicationsToFile, getPublicationsData} = require(`./helpers`);
const {MONTH_MILLISECONDS, MocksConfig} = require(`./common`);

const generatePublication = ({titles, descriptions, categories}) => ({
  title: getRandomItem(titles),
  createdDate: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ),
  announce: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_ANNOUNCE_COUNT,
          MocksConfig.TEXT.MAX_ANNOUNCE_COUNT
      )
  ).join(` `),
  fullText: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_FULL_TEXT_COUNT,
          descriptions.length
      )
  ).join(` `),
  category: getRandomItems(
      categories,
      getRandomNumber(
          MocksConfig.CATEGORY.MIN_COUNT,
          categories.length
      )
  ),
});

const generatePublications = ({count, titles, descriptions, categories}) => {
  const generatedPublications = Array.from(new Array(count), () =>
    generatePublication({
      titles,
      descriptions,
      categories,
    })
  );

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

    const {titles, descriptions, categories} = await getPublicationsData();
    const mockedPublications = generatePublications({
      count: publicationsCount,
      titles,
      descriptions,
      categories,
    });

    await savePublicationsToFile(mockedPublications);
  },
};
