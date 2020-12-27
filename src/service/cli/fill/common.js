'use strict';

const FILL_FILE_PATH = `./db/fill-db.sql`;

const TableName = {
  CATEGORIES: `categories`,
  USERS: `users`,
  COMMENTS: `comments`,
  ARTICLES: `articles`,
  ARTICLES_CATEGORIES: `articles_categories`,
};

module.exports = {
  FILL_FILE_PATH,
  TableName,
};
