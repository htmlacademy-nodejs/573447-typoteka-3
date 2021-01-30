'use strict';

const Joi = require(`joi`);
const {QueryValidationMessage, SortType} = require(`~/common/enums`);

const queryOrder = Joi.string().valid(SortType.DESC, SortType.ASC).messages({
  'any.only': QueryValidationMessage.ORDER_EXACT_VALUE,
});

module.exports = {
  queryOrder,
};
