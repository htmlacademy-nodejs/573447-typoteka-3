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
          type: new DataTypes.STRING(250),
          allowNull: false,
        },
        [ArticleKey.ANNOUNCE]: {
          type: new DataTypes.STRING(250),
          allowNull: false,
        },
        [ArticleKey.CREATED_DATE]: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        [ArticleKey.FULL_TEXT]: {
          type: new DataTypes.STRING(1000),
        },
        [ArticleKey.IMAGE]: {
          type: new DataTypes.STRING(150),
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
