'use strict';

const {Sequelize} = require(`sequelize`);
const {ENV, AppEnvironment} = require(`~/common/enums`);
const {dbConfig} = require(`./sequelize-config`);

const config = dbConfig[ENV.NODE_ENV || AppEnvironment.DEVELOPMENT];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: Number(config.port),
      dialect: config.dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
    }
);

module.exports = sequelize;
