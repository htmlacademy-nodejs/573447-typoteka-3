'use strict';

const {DataTypes} = require(`sequelize`);
const {ModelName, TableName} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.CATEGORY,
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: TableName.CATEGORIES,
      }
  );
};

module.exports = {
  define,
};
