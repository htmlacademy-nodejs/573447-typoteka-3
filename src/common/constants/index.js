'use strict';

const {USER_ARGV_IDX, COMMAND_ARGS_IDX} = require(`./cli.constants`);
const {MOCKS_FILE_PATH} = require(`./mocks.constants`);
const {API_PREFIX} = require(`./api.constants`);
const {
  INITIAL_ARRAY_IDX,
  INCREASE_COUNT_FOR_IDX,
} = require(`./array.constants`);
const {ARTICLES_PER_PAGE, HOT_ARTICLES_COUNT} = require(`./articles.constants`);
const {USER_PASSWORD_SALT_ROUNDS} = require(`./user.constants`);
const {SOCKET_OBJECT} = require(`./socket.constants`);
const {LAST_COMMENTS_COUNT} = require(`./comments.constants`);

module.exports = {
  USER_ARGV_IDX,
  COMMAND_ARGS_IDX,
  MOCKS_FILE_PATH,
  API_PREFIX,
  INITIAL_ARRAY_IDX,
  INCREASE_COUNT_FOR_IDX,
  ARTICLES_PER_PAGE,
  USER_PASSWORD_SALT_ROUNDS,
  SOCKET_OBJECT,
  HOT_ARTICLES_COUNT,
  LAST_COMMENTS_COUNT,
};
