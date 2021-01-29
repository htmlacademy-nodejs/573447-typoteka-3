'use strict';

const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`);
const sequelize = require(`~/db/db`);
const {ENV, TableName, SessionExpiration} = require(`~/common/enums`);

const SequelizeStoreInstance = new SequelizeStore(session.Store);

const appSessionStore = new SequelizeStoreInstance({
  db: sequelize,
  expiration: SessionExpiration.PERIOD,
  checkExpirationInterval: SessionExpiration.CHECK,
  tableName: TableName.SESSIONS,
});

const sessionMiddleware = session({
  secret: ENV.SECRET,
  store: appSessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
  name: `session_id`,
  cookie: {
    sameSite: `strict`,
  },
});

module.exports = {
  sessionMiddleware,
};
