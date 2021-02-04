'use strict';

const {TableName} = require(`~/common/enums`);
const {
  generateCategoriesSqlRows,
  generateUsersSqlRows,
  generateCommentsSqlRows,
  generateArticlesSqlRows,
  generateArticlesCategoriesRows,
} = require(`./helpers`);

const FILL_FILE_PATH = `./db/fill-db.sql`;

const tableNameToSqlRowsGeneratorMap = {
  [TableName.USERS]: generateUsersSqlRows,
  [TableName.CATEGORIES]: generateCategoriesSqlRows,
  [TableName.ARTICLES]: generateArticlesSqlRows,
  [TableName.COMMENTS]: generateCommentsSqlRows,
  [TableName.ARTICLES_CATEGORIES]: generateArticlesCategoriesRows,
};

module.exports = {
  FILL_FILE_PATH,
  tableNameToSqlRowsGeneratorMap,
};
