'use strict';

const {existArticle} = require(`./article`);
const {validateSchema, validateParamSchema} = require(`./validation`);
const {checkAlreadyRegister, checkUserAuthenticate} = require(`./user`);

module.exports = {
  existArticle,
  validateSchema,
  validateParamSchema,
  checkAlreadyRegister,
  checkUserAuthenticate,
};
