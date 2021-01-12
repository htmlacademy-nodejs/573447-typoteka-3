'use strict';

const {ArticleKey} = require(`~/common/enums`);

const articleRequireKeys = [
  ArticleKey.TITLE,
  ArticleKey.ANNOUNCE,
  ArticleKey.FULL_TEXT,
  ArticleKey.CATEGORIES,
];

module.exports = {
  articleRequireKeys,
};
