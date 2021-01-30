'use strict';

const {
  checkAlreadyRegister,
} = require(`./check-already-register/check-already-register`);
const {
  checkUserAuthenticate,
} = require(`./check-user-authenticate/check-user-authenticate`);
const {checkIsAdmin} = require(`./check-is-admin/check-is-admin`);

module.exports = {
  checkAlreadyRegister,
  checkUserAuthenticate,
  checkIsAdmin,
};
