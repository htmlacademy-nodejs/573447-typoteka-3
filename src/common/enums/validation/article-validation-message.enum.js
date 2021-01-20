'use strict';

const {
  ArticleValidationRule,
} = require(`~/common/enums/validation/article-validation-rule.enum`);

const ArticleValidationMessage = {
  TITLE_MIN_LENGTH: `Заголовок должен быть не меньше ${ArticleValidationRule.TITLE_MIN_LENGTH} символов`,
  TITLE_MAX_LENGTH: `Заголовок должен быть не больше ${ArticleValidationRule.TITLE_MAX_LENGTH} символов`,
  TITLE_REQUIRE: `Заголовок обязательное поле`,
  CREATED_DATE_REQUIRE: `Дата создания обязательное поле`,
  CATEGORIES_MIN_COUNT: `Статья должна иметь не меньше ${ArticleValidationRule.CATEGORIES_MIN_COUNT} категории`,
  CATEGORIES_REQUIRE: `Категория обязательное поле`,
  ANNOUNCE_MIN_LENGTH: `Анонс публикации должен быть не меньше ${ArticleValidationRule.ANNOUNCE_MIN_LENGTH} символов`,
  ANNOUNCE_MAX_LENGTH: `Анонс публикации должен быть не больше ${ArticleValidationRule.ANNOUNCE_MAX_LENGTH} символов`,
  ANNOUNCE_REQUIRE: `Анонс публикации обязательное поле`,
  FULL_TEXT_MAX_LENGTH: `Полный текст публикации должен быть не больше ${ArticleValidationRule.FULL_TEXT_MAX_LENGTH} символов`,
};

module.exports = {
  ArticleValidationMessage,
};
