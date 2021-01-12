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
          type: new DataTypes.STRING(150),
          allowNull: false,
        },
        [ArticleKey.ANNOUNCE]: {
          type: new DataTypes.STRING(350),
          allowNull: false,
        },
        [ArticleKey.FULL_TEXT]: {
          type: DataTypes.TEXT,
          allowNull: false
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
