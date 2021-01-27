'use strict';

const {define: defineArticleModel} = require(`./article/article`);
const {define: defineArticleCategoryModel} = require(`./article-category/article-category`);
const {define: defineCategoryModel} = require(`./category/category`);
const {define: defineCommentModel} = require(`./comment/comment`);
const {define: defineUserModel} = require(`./user/user`);
const {define: defineSessionModel} = require(`./session/session`);

module.exports = {
  defineArticleModel,
  defineArticleCategoryModel,
  defineCategoryModel,
  defineCommentModel,
  defineUserModel,
  defineSessionModel,
};
