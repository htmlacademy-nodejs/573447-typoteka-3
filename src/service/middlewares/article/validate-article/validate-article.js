'use strict';

const {HttpCode} = require(`~/common/enums`);
const {checkIsValidArticle} = require(`./helpers`);

const validateArticle = (req, res, next) => {
  const newArticle = req.body;
  const isValidArticle = checkIsValidArticle(newArticle);

  if (!isValidArticle) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};

module.exports = {
  validateArticle,
};
