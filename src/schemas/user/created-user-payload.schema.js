'use strict';

const Joi = require(`joi`);
const {
  CreatedUserPayloadKey,
  CreatedUserValidationMessage,
  CreatedUserValidationRule,
} = require(`~/common/enums`);

const createdUserPayload = Joi.object({
  [CreatedUserPayloadKey.EMAIL]: Joi.string().email().required().messages({
    'any.required': CreatedUserValidationMessage.EMAIL_REQUIRE,
    'string.email': CreatedUserValidationMessage.EMAIL_WRONG,
  }),
  [CreatedUserPayloadKey.PASSWORD]: Joi.string()
    .min(CreatedUserValidationRule.PASSWORD_MIN_LENGTH)
    .required()
    .messages({
      'any.required': CreatedUserValidationMessage.PASSWORD_REQUIRE,
      'string.min': CreatedUserValidationMessage.PASSWORD_MIN_LENGTH,
    }),
  [CreatedUserPayloadKey.REPEATED_PASSWORD]: Joi.string()
    .valid(Joi.ref(CreatedUserPayloadKey.PASSWORD))
    .required()
    .messages({
      'any.only': CreatedUserValidationMessage.REPEATED_PASSWORD_EQUALS,
      'any.required': CreatedUserValidationMessage.REPEATED_PASSWORD_REQUIRE,
    }),
  [CreatedUserPayloadKey.FIRST_NAME]: Joi.string()
    .regex(/^[A-zА-я]+$/)
    .required()
    .messages({
      'any.required': CreatedUserValidationMessage.FIRST_NAME_REQUIRE,
      'string.pattern.base': CreatedUserValidationMessage.FIRST_NAME_WRONG,
    }),
  [CreatedUserPayloadKey.LAST_NAME]: Joi.string()
    .regex(/^[A-zА-я]+$/)
    .required()
    .messages({
      'any.required': CreatedUserValidationMessage.LAST_NAME_REQUIRE,
      'string.pattern.base': CreatedUserValidationMessage.LAST_NAME_REQUIRE,
    }),
  [CreatedUserPayloadKey.AVATAR]: Joi.string().required().messages({
    'any.required': CreatedUserValidationMessage.AVATAR_REQUIRE,
  }),
});

module.exports = {
  createdUserPayload,
};
