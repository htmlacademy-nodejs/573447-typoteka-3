'use strict';

const Joi = require(`joi`);
const {CategoryKey, CategoryValidationMessage} = require(`~/common/enums`);

const category = Joi.object({
  [CategoryKey.NAME]: Joi.string({
    'string.min': CategoryValidationMessage.NAME_MIN_LENGTH,
    'string.max': CategoryValidationMessage.NAME_MAX_LENGTH,
    'any.required': CategoryValidationMessage.NAME_REQUIRE,
  }),
});

module.exports = {
  category,
};
