'use strict';

const {comment} = require(`./comment`);
const {article} = require(`./article`);
const {routeId, queryOrder, queryLimit} = require(`./route`);
const {createdUserPayload, userLoginPayload} = require(`./user`);
const {category} = require(`./category`);

module.exports = {
  comment,
  article,
  routeId,
  queryOrder,
  queryLimit,
  createdUserPayload,
  userLoginPayload,
  category,
};
