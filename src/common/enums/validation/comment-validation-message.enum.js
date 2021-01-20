'use strict';

const {
  CommentValidationRule,
} = require(`~/common/enums/validation/comment-validation-rule.enum`);

const CommentValidationMessage = {
  TEXT_MIN_LENGTH: `Коментарий должен быть минимум ${CommentValidationRule.TEXT_MIN_LENGTH} символов`,
};

module.exports = {
  CommentValidationMessage,
};
