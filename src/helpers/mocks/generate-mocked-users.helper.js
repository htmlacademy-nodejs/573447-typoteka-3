'use strict';

const {
  generateMockedUser,
} = require(`~/helpers/mocks/generate-mocked-user.helper`);

const generateMockedUsers = (usersPayloads) => {
  return Promise.all(usersPayloads.map(generateMockedUser));
};

module.exports = {
  generateMockedUsers,
};
