'use strict';

const {INCREASE_COUNT_FOR_IDX} = require(`~/common/constants`);
const {getRandomItems} = require(`~/helpers/array/get-random-items.helper`);
const {
  generateMockedArticleCategory,
} = require(`~/helpers/mocks/generate-mocked-article-category.helper`);

const generateMockedArticlesCategories = ({articleId, categories, count}) => {
  const categoryIds = categories.map((_, idx) => idx + INCREASE_COUNT_FOR_IDX);
  const randomCategories = getRandomItems(categoryIds, count);

  return randomCategories.map((categoryId) => {
    return generateMockedArticleCategory({
      categoryId,
      articleId,
    });
  });
};

module.exports = {
  generateMockedArticlesCategories,
};
