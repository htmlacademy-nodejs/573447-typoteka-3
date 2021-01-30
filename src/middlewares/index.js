'use strict';

const {existArticle} = require(`./article`);
const {
  validateSchema,
  validateParamSchema,
  validateQuerySchema,
} = require(`./validation`);
const {
  checkAlreadyRegister,
  checkUserAuthenticate,
  checkIsAdmin,
} = require(`./user`);

module.exports = {
  existArticle,
  validateSchema,
  validateParamSchema,
  checkAlreadyRegister,
  checkUserAuthenticate,
  checkIsAdmin,
  validateQuerySchema,
};
