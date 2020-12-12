'use strict';

const {CliCommandName, CliExitCode} = require(`./cli`);
const {MessageColor} = require(`./message`);
const {HttpCode, ApiPath, SearchApiPath, CategoryApiPath} = require(`./api`);
const {SsrPath, SsrMainPath, SsrArticlePath, SsrMyPath} = require(`./ssr`);
const {ArticleKey} = require(`./article`);
const {CommentKey} = require(`./comment`);

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
};
