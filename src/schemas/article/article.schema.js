'use strict';

const Joi = require(`joi`);
const {
  ArticleKey,
  ArticleValidationRule,
  ArticleValidationMessage,
} = require(`~/common/enums`);

const article = Joi.object({
  [ArticleKey.TITLE]: Joi.string()
    .min(ArticleValidationRule.TITLE_MIN_LENGTH)
    .max(ArticleValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.min': ArticleValidationMessage.TITLE_MIN_LENGTH,
      'string.max': ArticleValidationMessage.TITLE_MAX_LENGTH,
      'any.required': ArticleValidationMessage.TITLE_REQUIRE,
    }),
  [ArticleKey.IMAGE]: Joi.string().allow(null).required(),
  [ArticleKey.CREATED_DATE]: Joi.string().isoDate().required().messages({
    'any.required': ArticleValidationMessage.CREATED_DATE_REQUIRE,
  }),
  [ArticleKey.CATEGORIES]: Joi.array()
    .items(Joi.number())
    .min(ArticleValidationRule.CATEGORIES_MIN_COUNT)
    .required()
    .messages({
      'array.min': ArticleValidationMessage.CATEGORIES_MIN_COUNT,
      'any.require': ArticleValidationMessage.CATEGORIES_REQUIRE,
    }),
  [ArticleKey.ANNOUNCE]: Joi.string()
    .min(ArticleValidationRule.ANNOUNCE_MIN_LENGTH)
    .max(ArticleValidationRule.ANNOUNCE_MAX_LENGTH)
    .required()
    .messages({
      'string.min': ArticleValidationMessage.ANNOUNCE_MIN_LENGTH,
      'string.max': ArticleValidationMessage.ANNOUNCE_MAX_LENGTH,
      'any.require': ArticleValidationMessage.ANNOUNCE_REQUIRE,
    }),
  [ArticleKey.FULL_TEXT]: Joi.string()
    .max(ArticleValidationRule.FULL_TEXT_MAX_LENGTH)
    .messages({
      'string.max': ArticleValidationMessage.FULL_TEXT_MAX_LENGTH,
    }),
});

module.exports = {
  article,
};
