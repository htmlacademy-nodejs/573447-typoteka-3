'use strict';

const {DataTypes} = require(`sequelize`);
const {
  TableName,
  ModelName,
  SessionKey,
  SessionValidationRule,
} = require(`~/common/enums`);

const define = (sequelize) => {
  return sequelize.define(
      ModelName.SESSION,
      {
        [SessionKey.SID]: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        [SessionKey.EXPIRES]: {
          type: DataTypes.DATE,
        },
        [SessionKey.DATA]: {
          type: new DataTypes.STRING(SessionValidationRule.DATA_LENGTH),
        },
      },
      {
        tableName: TableName.SESSIONS,
      }
  );
};

module.exports = {
  define,
};
