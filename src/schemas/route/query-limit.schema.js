'use strict';

const Joi = require(`joi`);
const {QueryValidationMessage} = require(`~/common/enums`);

const queryLimit = Joi.number().messages({
  'number.base': QueryValidationMessage.LIMIT_NUMBER,
});

module.exports = {
  queryLimit,
};
