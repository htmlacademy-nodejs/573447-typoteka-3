'use strict';

const {getRandomItem, getRandomItems, getRandomNumber} = require(`~/helpers`);
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
  announce: getRandomItems(MocksConfig.TEXT.TEXTS, MocksConfig.TEXT.MAX_ANNOUNCE_COUNT),
  fullText: getRandomItems(MocksConfig.TEXT.TEXTS, MocksConfig.TEXT.TEXTS.length),
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

    console.log(mockedPublications);
  },
};
