'use strict';

const {USER_ARGV_IDX, COMMAND_ARGS_IDX} = require(`./cli.constants`);
const {MOCKS_FILE_PATH} = require(`./mocks.constants`);
const {API_PREFIX} = require(`./api.constants`);
const {
  INITIAL_ARRAY_IDX,
  INCREASE_COUNT_FOR_IDX,
} = require(`./array.constants`);
const {
  ARTICLES_PER_PAGE,
  ARTICLES_SKIP_PAGE_COUNT,
} = require(`./articles.constants`);

module.exports = {
  USER_ARGV_IDX,
  COMMAND_ARGS_IDX,
  MOCKS_FILE_PATH,
  API_PREFIX,
  INITIAL_ARRAY_IDX,
  INCREASE_COUNT_FOR_IDX,
  ARTICLES_PER_PAGE,
  ARTICLES_SKIP_PAGE_COUNT,
};
