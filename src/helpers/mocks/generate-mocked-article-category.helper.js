'use strict';

const {ArticleCategoryKey} = require(`~/common/enums`);

const generateMockedArticleCategory = ({articleId, categoryId}) => ({
  [ArticleCategoryKey.ARTICLE_ID]: articleId,
  [ArticleCategoryKey.CATEGORY_ID]: categoryId,
});

module.exports = {
  generateMockedArticleCategory,
};
