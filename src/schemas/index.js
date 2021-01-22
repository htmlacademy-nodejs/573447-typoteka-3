'use strict';

const {comment} = require(`./comment/comment.schema`);
const {article} = require(`./article/article.schema`);
const {routeId} = require(`./route`);

module.exports = {
  comment,
  article,
  routeId,
};
