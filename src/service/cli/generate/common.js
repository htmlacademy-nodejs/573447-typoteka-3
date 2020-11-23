'use strict';

const MONTH_MILLISECONDS = 2592000000;
const DATA_PATH = `./data`;

const MocksConfig = {
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  FILE_NAME: `mocks.json`,
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
  CATEGORY: {
    MIN_COUNT: 1,
    FILE_PATH: `${DATA_PATH}/categories.txt`,
  },
};

module.exports = {
  MONTH_MILLISECONDS,
  MocksConfig,
};
