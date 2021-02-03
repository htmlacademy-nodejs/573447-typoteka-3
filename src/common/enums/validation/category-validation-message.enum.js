'use strict';

const {
  CategoryValidationRule,
} = require(`~/common/enums/validation/category-validation-rule.enum`);

const CategoryValidationMessage = {
  NAME_MIN_LENGTH: `Имя категории должен быть не меньше ${CategoryValidationRule.NAME_MIN_LENGTH} символов`,
  NAME_MAX_LENGTH: `Имя категории должен быть не больше ${CategoryValidationRule.NAME_MAX_LENGTH} символов`,
  NAME_REQUIRE: `Имя категории обязательное поле`,
};

module.exports = {
  CategoryValidationMessage,
};
