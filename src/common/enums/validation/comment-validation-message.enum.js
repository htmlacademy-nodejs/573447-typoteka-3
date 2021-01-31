'use strict';

const {
  CommentValidationRule,
} = require(`~/common/enums/validation/comment-validation-rule.enum`);

const CommentValidationMessage = {
  TEXT_MIN_LENGTH: `Коментарий должен быть минимум ${CommentValidationRule.TEXT_MIN_LENGTH} символов`,
  TEXT_REQUIRE: `Коментарий обязательное поле`,
  USER_ID_REQUIRE: `Идентификатор пользователя обязательное поле`,
};

module.exports = {
  CommentValidationMessage,
};
