'use strict';

const {Sequelize} = require(`sequelize`);
const {ENV} = require(`~/common/enums`);
const {dbConfig} = require(`./sequelize-config`);

const config = dbConfig[ENV.NODE_ENV];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: Number(config.port),
      dialect: `postgres`,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
    }
);

module.exports = sequelize;
