'use strict';

const Joi = require(`joi`);
const {
  CommentKey,
  CommentValidationMessage,
  CommentValidationRule,
} = require(`~/common/enums`);

const comment = Joi.object({
  [CommentKey.TEXT]: Joi.string()
    .min(CommentValidationRule.TEXT_MIN_LENGTH)
    .required()
    .messages({
      'any.require': CommentValidationMessage.TEXT_REQUIRE,
      'string.min': CommentValidationMessage.TEXT_MIN_LENGTH,
    }),
});

module.exports = {
  comment,
};
