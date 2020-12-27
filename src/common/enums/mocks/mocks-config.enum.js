'use strict';

const {MOCKS_FILE_PATH} = require(`~/common/constants`);

const DATA_PATH = `./data`;

const MocksConfig = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  FILE_NAME: MOCKS_FILE_PATH,
  TITLE: {
    FILE_PATH: `${DATA_PATH}/titles.txt`,
  },
  TEXT: {
    MAX_ANNOUNCE_COUNT: 5,
    MIN_ANNOUNCE_COUNT: 1,
    MIN_FULL_TEXT_COUNT: 1,
    FILE_PATH: `${DATA_PATH}/sentences.txt`,
  },
  DATE: {
    MIN_MONTHS_BREAK: 0,
    MAX_MONTHS_BREAK: 3,
  },
  IMAGES: [`forest`, `sea`, `forest`],
  CATEGORY: {
    MIN_COUNT: 1,
    MAX_COUNT: 3,
    FILE_PATH: `${DATA_PATH}/categories.txt`,
  },
  COMMENTS: {
    FILE_PATH: `${DATA_PATH}/comments.txt`,
    MIN_COUNT: 1,
    MAX_COUNT: 4,
    MIN_SENTENCES_COUNT: 1,
    MAX_SENTENCES_COUNT: 3,
  },
  USER_PICTURE: {
    NUMBER: {
      MIN: 1,
      MAX: 5,
    },
  },
  USERS: {
    FILE_PATH: `${DATA_PATH}/users.txt`,
  },
};

module.exports = {
  MocksConfig,
};
