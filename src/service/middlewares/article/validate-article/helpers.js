'use strict';

const {checkIsValidByKeys} = require(`~/helpers`);
const {articleRequireKeys} = require(`./common`);

const checkIsValidArticle = (article) => {
  const isValidArticle = checkIsValidByKeys(article, articleRequireKeys);

  return isValidArticle;
};

module.exports = {
  checkIsValidArticle,
};
