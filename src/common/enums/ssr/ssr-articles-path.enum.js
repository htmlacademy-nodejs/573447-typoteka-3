'use strict';

const SsrArticlePath = {
  $ARTICLE_ID: `/:id`,
  EDIT_$ARTICLE_ID: `/edit/:id`,
  ADD: `/add`,
  CATEGORY_$ARTICLE_ID: `/category/:id`,
};

module.exports = {
  SsrArticlePath,
};
