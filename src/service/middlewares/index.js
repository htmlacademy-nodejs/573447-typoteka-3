'use strict';

const {validateComment} = require(`./comments`);
const {existArticle, validateArticle} = require(`./article`);

module.exports = {
  validateComment,
  existArticle,
  validateArticle,
};
