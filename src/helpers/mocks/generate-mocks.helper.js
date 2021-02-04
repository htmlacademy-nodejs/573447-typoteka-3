'use strict';

const {MocksConfig} = require(`~/common/enums`);
const {INCREASE_COUNT_FOR_IDX} = require(`~/common/constants`);
const {getMockedData} = require(`~/helpers/mocks/get-mocked-data.helper`);
const {
  generateMockedUsers,
} = require(`~/helpers/mocks/generate-mocked-users.helper`);
const {
  generateMockedCategories,
} = require(`~/helpers/mocks/generate-mocked-categories.helper`);
const {
  generatePublications,
} = require(`~/helpers/mocks/generate-publications.helper`);
const {
  generateMockedComments,
} = require(`~/helpers/mocks/generate-mocked-comments.helper`);
const {
  generateMockedArticlesCategories,
} = require(`~/helpers/mocks/generate-mocked-articles-categories.helper`);
const {getRandomNumber} = require(`~/helpers/number/get-random-number.helper`);


const generateMocks = async ({articlesCount}) => {
  const {
    users,
    categories,
    titles,
    descriptions,
    comments,
  } = await getMockedData();
  const mockedUsers = await generateMockedUsers(users);
  const mockedCategories = generateMockedCategories(categories);
  const mockedArticles = generatePublications({
    titles,
    descriptions,
    count: articlesCount,
  });
  const mockedComments = Array.from(new Array(articlesCount), (_, idx) => {
    const articleId = idx + INCREASE_COUNT_FOR_IDX;

    return generateMockedComments({
      users,
      comments,
      articleId,
      count: getRandomNumber(
          MocksConfig.COMMENTS.MIN_COUNT,
          MocksConfig.COMMENTS.MAX_COUNT
      ),
    });
  }).flat();
  const mockedArticlesCategories = Array.from(
      new Array(articlesCount),
      (_, idx) => {
        const articleId = idx + INCREASE_COUNT_FOR_IDX;

        return generateMockedArticlesCategories({
          articleId,
          categories,
          count: getRandomNumber(
              MocksConfig.CATEGORY.MIN_COUNT,
              MocksConfig.CATEGORY.MAX_COUNT
          )
        });
      }
  ).flat();

  return {
    users: mockedUsers,
    categories: mockedCategories,
    articles: mockedArticles,
    comments: mockedComments,
    articlesCategories: mockedArticlesCategories,
  };
};

module.exports = {
  generateMocks,
};
