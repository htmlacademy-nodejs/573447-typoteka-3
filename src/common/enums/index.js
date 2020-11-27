'use strict';

const {CliCommandName, CliExitCode} = require(`./cli`);
const {MessageColor} = require(`./message`);
const {
  HttpCode,
  ApiRoute,
  ApiMainRoute,
  ApiMyRoute,
  ApiArticlesRoute,
} = require(`./api`);

module.exports = {
  CliCommandName,
  CliExitCode,
  MessageColor,
  HttpCode,
  ApiRoute,
  ApiMainRoute,
  ApiMyRoute,
  ApiArticlesRoute,
};
