'use strict';

const {comment} = require(`./comment/comment.schema`);
const {article} = require(`./article/article.schema`);
const {routeId} = require(`./route`);
const {createdUserPayload, userLoginPayload} = require(`./user`);

module.exports = {
  comment,
  article,
  routeId,
  createdUserPayload,
  userLoginPayload,
};
