'use strict';

const {
  CreatedUserValidationRule,
} = require(`~/common/enums/validation/created-user-validation-rule.enum`);

const CreatedUserValidationMessage = {
  EMAIL_REQUIRE: `Электронная почта обязательное поле`,
  EMAIL_WRONG: `Неправильный email`,
  EMAIL_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
  PASSWORD_REQUIRE: `Пароль обязательно поле`,
  PASSWORD_MIN_LENGTH: `Пароль должен быть минимум ${CreatedUserValidationRule.PASSWORD_MIN_LENGTH} символов`,
  REPEATED_PASSWORD_REQUIRE: `Повторяемы пароль обязательное поле`,
  REPEATED_PASSWORD_EQUALS: `Пароли не совпадают`,
  FIRST_NAME_REQUIRE: `Имя обязательное поле`,
  FIRST_NAME_WRONG: `Имя должно быть валидным полем`,
  LAST_NAME_REQUIRE: `Фамилия обязательное поле`,
  LAST_NAME_WRONG: `Фамилия должно быть валидным полем`,
  AVATAR_REQUIRE: `Аватар обязательное поле`,
};

module.exports = {
  CreatedUserValidationMessage,
};
