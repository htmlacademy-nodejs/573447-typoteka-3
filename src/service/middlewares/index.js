'use strict';

const {existArticle} = require(`./article`);
const {validateSchema, validateParamSchema} = require(`./validation`);

module.exports = {
  existArticle,
  validateSchema,
  validateParamSchema,
};
