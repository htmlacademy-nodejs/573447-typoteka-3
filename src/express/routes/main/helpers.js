'use strict';

const getRegisterData = (body, file) => ({
  email: body.email,
  password: body.password,
  repeatedPassword: body.repeatedPassword,
  firstName: body.firstName,
  lastName: body.lastName,
  avatar: file ? file.filename : null,
});

module.exports = {
  getRegisterData,
};
