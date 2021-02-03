'use strict';

const {
  CreatedUserPayloadKey,
  UserLoginPayloadKey,
  CategoryKey,
} = require(`~/common/enums`);

const getRegisterData = (body, file) => ({
  [CreatedUserPayloadKey.EMAIL]: body.email,
  [CreatedUserPayloadKey.PASSWORD]: body.password,
  [CreatedUserPayloadKey.REPEATED_PASSWORD]: body.repeatedPassword,
  [CreatedUserPayloadKey.FIRST_NAME]: body.firstName,
  [CreatedUserPayloadKey.LAST_NAME]: body.lastName,
  [CreatedUserPayloadKey.AVATAR]: file ? file.filename : null,
});

const getLoginData = (body) => ({
  [UserLoginPayloadKey.EMAIL]: body.email,
  [UserLoginPayloadKey.PASSWORD]: body.password,
});

const getCategoryData = (body) => ({
  [CategoryKey.NAME]: body.name,
});

module.exports = {
  getRegisterData,
  getLoginData,
  getCategoryData,
};
