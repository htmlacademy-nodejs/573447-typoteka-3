'use strict';

const {ArticleKey} = require(`~/common/enums`);

const getParsedCategories = (categories) => {
  if (!categories) {
    return [];
  }

  return Array.isArray(categories)
    ? categories.map(Number)
    : [Number(categories)];
};

const getArticleData = (body, filename) => ({
  [ArticleKey.IMAGE]: filename || null,
  [ArticleKey.TITLE]: body.title,
  [ArticleKey.ANNOUNCE]: body.announce,
  [ArticleKey.CREATED_DATE]: new Date(body.createdDate).toISOString(),
  [ArticleKey.FULL_TEXT]: body.fullText || null,
  [ArticleKey.CATEGORIES]: getParsedCategories(body.category),
});

module.exports = {
  getParsedCategories,
  getArticleData,
};
