'use strict';

const ArticleValidationRule = {
  TITLE_MIN_LENGTH: 30,
  TITLE_MAX_LENGTH: 250,
  CATEGORIES_MIN_COUNT: 1,
  ANNOUNCE_MIN_LENGTH: 30,
  ANNOUNCE_MAX_LENGTH: 250,
  FULL_TEXT_MAX_LENGTH: 1000,
};

module.exports = {
  ArticleValidationRule,
};
