'use strict';

const nanoid = require(`nanoid`);

const DEFAULT_ID_LENGTH = 6;

const getRandomId = (size = DEFAULT_ID_LENGTH) => {
  const randomId = nanoid(size);

  return randomId;
};

module.exports = {
  getRandomId,
};
