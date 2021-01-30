'use strict';

const {comment} = require(`./comment/comment.schema`);
const {article} = require(`./article/article.schema`);
const {routeId, queryOrder, queryLimit} = require(`./route`);
const {createdUserPayload, userLoginPayload} = require(`./user`);

module.exports = {
  comment,
  article,
  routeId,
  queryOrder,
  queryLimit,
  createdUserPayload,
  userLoginPayload,
};
