'use strict';

const {HttpCode} = require(`~/common/enums`);
const {checkIsValidComment} = require(`./helpers`);

const validateComment = (req, res, next) => {
  const newComment = req.body;
  const isValidComment = checkIsValidComment(newComment);

  if (!isValidComment) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};

module.exports = {
  validateComment,
};
