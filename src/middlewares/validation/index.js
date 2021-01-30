'use strict';

const {validateSchema} = require(`./validate-schema/validate-schema`);
const {
  validateParamSchema,
} = require(`./validate-param-schema/validate-param-schema`);
const {
  validateQuerySchema,
} = require(`./validate-query-schema/validate-query-schema`);

module.exports = {
  validateSchema,
  validateParamSchema,
  validateQuerySchema,
};
