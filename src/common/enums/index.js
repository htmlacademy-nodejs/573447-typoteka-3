'use strict';

const {CliCommandName, CliExitCode} = require(`./cli`);
const {MessageColor} = require(`./message`);
const {
  HttpCode,
  ApiPath,
  SearchApiPath,
  CategoryApiPath,
  ArticlesApiPath,
  HttpMethod,
  RequestParam,
} = require(`./api`);
const {SsrPath, SsrMainPath, SsrArticlePath, SsrMyPath} = require(`./ssr`);
const {ArticleKey} = require(`./article`);
const {CommentKey} = require(`./comment`);
const {AppEnvironment, ENV, LogLevel, LoggerName} = require(`./app`);
const {MocksConfig} = require(`./mocks`);
const {ModelAlias, ModelName, TableName, DbOperator} = require(`./db`);
const {
  CommentValidationMessage,
  CommentValidationRule,
  ArticleValidationMessage,
  ArticleValidationRule,
  RouteIdValidationMessage,
} = require(`./validation`);

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
  HttpMethod,
  RequestParam,
  AppEnvironment,
  ENV,
  LogLevel,
  LoggerName,
  MocksConfig,
  ModelAlias,
  ModelName,
  TableName,
  DbOperator,
  CommentValidationMessage,
  CommentValidationRule,
  ArticleValidationMessage,
  ArticleValidationRule,
  RouteIdValidationMessage,
};
