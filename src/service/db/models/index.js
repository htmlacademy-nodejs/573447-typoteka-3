'use strict';

const {define: defineArticleModel} = require(`./article/article`);
const {define: defineArticleCategoryModel} = require(`./article-category/article-category`);
const {define: defineCategoryModel} = require(`./category/category`);
const {define: defineCommentModel} = require(`./comment/comment`);

module.exports = {
  defineArticleModel,
  defineArticleCategoryModel,
  defineCategoryModel,
  defineCommentModel
};
