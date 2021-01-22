'use strict';

const Joi = require(`joi`);
const {RouteIdValidationMessage} = require(`~/common/enums`);

const routeId = Joi.number().required().messages({
  'number.base': RouteIdValidationMessage.NUMBER,
});

module.exports = {
  routeId,
};
