'use strict';

const {ModelName, TableName} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.ARTICLE_CATEGORY,
      {},
      {
        tableName: TableName.ARTICLES_CATEGORIES,
      }
  );
};

module.exports = {
  define,
};
