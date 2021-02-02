'use strict';

const {DataTypes} = require(`sequelize`);
const {
  ModelName,
  TableName,
  CategoryKey,
  CategoryValidationRule,
} = require(`~/common/enums`);

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
          type: new DataTypes.STRING(CategoryValidationRule.NAME_MAX_LENGTH),
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
