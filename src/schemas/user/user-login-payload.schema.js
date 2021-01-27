'use strict';

const Joi = require(`joi`);
const {
  UserLoginPayloadKey,
  UserLoginValidationMessage,
} = require(`~/common/enums`);

const userLoginPayload = Joi.object({
  [UserLoginPayloadKey.EMAIL]: Joi.string().email().required().messages({
    'any.required': UserLoginValidationMessage.EMAIL_REQUIRE,
    'string.email': UserLoginValidationMessage.EMAIL_WRONG,
  }),
  [UserLoginPayloadKey.PASSWORD]: Joi.string().required().messages({
    'any.required': UserLoginValidationMessage.PASSWORD_REQUIRE,
  }),
});

module.exports = {
  userLoginPayload,
};
