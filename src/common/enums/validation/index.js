'use strict';

const {CommentValidationRule} = require(`./comment-validation-rule.enum`);
const {CommentValidationMessage} = require(`./comment-validation-message.enum`);
const {ArticleValidationRule} = require(`./article-validation-rule.enum`);
const {ArticleValidationMessage} = require(`./article-validation-message.enum`);
const {
  RouteIdValidationMessage,
} = require(`./route-id-validation-message.enum`);
const {
  CreatedUserValidationRule,
} = require(`./created-user-validation-rule.enum`);
const {
  CreatedUserValidationMessage,
} = require(`./created-user-validation-message.enum`);

module.exports = {
  CommentValidationRule,
  CommentValidationMessage,
  ArticleValidationRule,
  ArticleValidationMessage,
  RouteIdValidationMessage,
  CreatedUserValidationRule,
  CreatedUserValidationMessage,
};
