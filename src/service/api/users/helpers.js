'use strict';

const {bcrypt} = require(`~/helpers`);
const {USER_PASSWORD_SALT_ROUNDS} = require(`~/common/constants`);

const mapCreatedUser = async (userRegisterPayload) => {
  const password = await bcrypt.hash(
      userRegisterPayload.password,
      USER_PASSWORD_SALT_ROUNDS
  );

  const copiedUserPayload = {
    ...userRegisterPayload,
    password,
  };

  delete copiedUserPayload.repeatedPassword;

  return copiedUserPayload;
};

module.exports = {
  mapCreatedUser,
};
