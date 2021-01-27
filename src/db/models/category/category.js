'use strict';

const {DataTypes} = require(`sequelize`);
const {ModelName, TableName, CategoryKey} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.CATEGORY,
      {
        [CategoryKey.ID]: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        [CategoryKey.NAME]: {
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
