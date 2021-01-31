'use strict';

const bcrypt = require(`bcrypt`);
const {getRandomNumber} = require(`~/helpers/number/get-random-number.helper`);
const {MocksConfig, UserKey} = require(`~/common/enums`);
const {USER_PASSWORD_SALT_ROUNDS} = require(`~/common/constants`);

const DEFAULT_USER_PASSWORD = `123456`;
const ADMIN_IDX = 0;

const generateMockedUser = async (userPayload, idx) => {
  const [firstName, lastName, email] = userPayload.split(` `);
  const avatar = `avatar-${getRandomNumber(
      MocksConfig.USER_PICTURE.NUMBER.MIN,
      MocksConfig.USER_PICTURE.NUMBER.MAX
  )}.png`;
  const isAdmin = idx === ADMIN_IDX;
  const password = await bcrypt.hash(DEFAULT_USER_PASSWORD, USER_PASSWORD_SALT_ROUNDS);

  return {
    [UserKey.EMAIL]: email,
    [UserKey.FIRST_NAME]: firstName,
    [UserKey.LAST_NAME]: lastName,
    [UserKey.AVATAR]: avatar,
    [UserKey.IS_ADMIN]: isAdmin,
    [UserKey.PASSWORD]: password,
  };
};

module.exports = {
  generateMockedUser,
};
