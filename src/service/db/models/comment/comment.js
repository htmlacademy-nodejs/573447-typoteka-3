'use strict';

const {DataTypes} = require(`sequelize`);
const {ModelName, TableName} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.COMMENT,
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        text: {
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
