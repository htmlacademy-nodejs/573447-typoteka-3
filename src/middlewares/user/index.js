'use strict';

const {
  checkAlreadyRegister,
} = require(`./check-already-register/check-already-register`);
const {
  checkUserAuthenticate,
} = require(`./check-user-authenticate/check-user-authenticate`);

module.exports = {
  checkAlreadyRegister,
  checkUserAuthenticate,
};
