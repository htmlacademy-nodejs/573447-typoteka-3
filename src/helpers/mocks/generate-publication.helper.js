'use strict';

const {getRandomNumber} = require(`~/helpers/number`);
const {getRandomItem, getRandomItems} = require(`~/helpers/array`);
const {
  generateMockedComments,
} = require(`~/helpers/mocks/generate-mocked-comments.helper`);
const {MocksConfig, ArticleKey} = require(`~/common/enums`);

const MONTH_MILLISECONDS = 2592000000;

const generatePublication = ({titles, descriptions, categories, comments, users}) => ({
  [ArticleKey.TITLE]: getRandomItem(titles),
  [ArticleKey.CREATED_DATE]: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ),
  [ArticleKey.ANNOUNCE]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_ANNOUNCE_COUNT,
          MocksConfig.TEXT.MAX_ANNOUNCE_COUNT
      )
  ).join(` `),
  [ArticleKey.FULL_TEXT]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_FULL_TEXT_COUNT,
          MocksConfig.TEXT.MAX_FULL_TEXT_COUNT
      )
  ).join(` `),
  [ArticleKey.IMAGE]: `${getRandomItem(MocksConfig.IMAGES)}.jpg`,
  [ArticleKey.CATEGORIES]: getRandomItems(
      categories,
      getRandomNumber(
          MocksConfig.CATEGORY.MIN_COUNT,
          MocksConfig.CATEGORY.MAX_COUNT
      )
  ),
  [ArticleKey.COMMENTS]: generateMockedComments({
    count: getRandomNumber(
        MocksConfig.COMMENTS.MIN_COUNT,
        MocksConfig.COMMENTS.MAX_COUNT
    ),
    comments,
    users,
  }),
});

module.exports = {
  generatePublication,
};
