'use strict';

const {CliCommandName, CliExitCode} = require(`./cli`);
const {MessageColor} = require(`./message`);
const {
  HttpCode,
  ApiPath,
  SearchApiPath,
  CategoryApiPath,
  ArticlesApiPath,
} = require(`./api`);
const {SsrPath, SsrMainPath, SsrArticlePath, SsrMyPath} = require(`./ssr`);
const {ArticleKey} = require(`./article`);
const {CommentKey} = require(`./comment`);
const {AppEnvironment, ENV, LogLevel, LoggerName} = require(`./app`);

module.exports = {
  CliCommandName,
  CliExitCode,
  MessageColor,
  HttpCode,
  ApiPath,
  SearchApiPath,
  CategoryApiPath,
  SsrPath,
  SsrMainPath,
  SsrArticlePath,
  SsrMyPath,
  ArticleKey,
  CommentKey,
  ArticlesApiPath,
  AppEnvironment,
  ENV,
  LogLevel,
  LoggerName,
};
