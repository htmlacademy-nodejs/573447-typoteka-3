'use strict';

const {DataTypes} = require(`sequelize`);
const {ModelName, TableName, ArticleKey} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.ARTICLE,
      {
        [ArticleKey.ID]: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        [ArticleKey.TITLE]: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        [ArticleKey.ANNOUNCE]: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        [ArticleKey.FULL_TEXT]: {
          type: DataTypes.STRING,
          allowNull: false
        },
        [ArticleKey.IMAGE]: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: TableName.ARTICLES,
      }
  );
};

module.exports = {
  define,
};
