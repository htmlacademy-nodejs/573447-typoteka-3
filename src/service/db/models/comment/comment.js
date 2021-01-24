'use strict';

const {DataTypes} = require(`sequelize`);
const {ModelName, TableName, CommentKey} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.COMMENT,
      {
        [CommentKey.ID]: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        [CommentKey.TEXT]: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: TableName.COMMENTS,
      }
  );
};

module.exports = {
  define,
};
