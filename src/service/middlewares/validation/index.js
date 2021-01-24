'use strict';

const {validateSchema} = require(`./validate-schema/validate-schema`);
const {validateParamSchema} = require(`./validate-param-schema/validate-param-schema`);

module.exports = {
  validateSchema,
  validateParamSchema,
};
