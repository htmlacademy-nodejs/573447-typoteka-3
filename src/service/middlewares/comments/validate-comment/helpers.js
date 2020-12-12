'use strict';

const {checkIsValidByKeys} = require(`~/helpers`);
const {commentRequireKeys} = require(`./common`);

const checkIsValidComment = (comment) => {
  const isValidComment = checkIsValidByKeys(comment, commentRequireKeys);

  return isValidComment;
};

module.exports = {
  checkIsValidComment,
};
