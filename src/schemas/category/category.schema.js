'use strict';

const Joi = require(`joi`);
const {
  CategoryKey,
  CategoryValidationRule,
  CategoryValidationMessage,
} = require(`~/common/enums`);

const category = Joi.object({
  [CategoryKey.NAME]: Joi.string()
    .min(CategoryValidationRule.NAME_MIN_LENGTH)
    .max(CategoryValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.min': CategoryValidationMessage.NAME_MIN_LENGTH,
      'string.max': CategoryValidationMessage.NAME_MAX_LENGTH,
      'any.required': CategoryValidationMessage.NAME_REQUIRE,
    }),
});

module.exports = {
  category,
};
