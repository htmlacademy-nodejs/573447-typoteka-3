'use strict';

const {createdUserPayload} = require(`./created-user-payload.schema`);
const {userLoginPayload} = require(`./user-login-payload.schema`);

module.exports = {
  createdUserPayload,
  userLoginPayload,
};
