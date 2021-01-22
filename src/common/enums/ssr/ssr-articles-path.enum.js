'use strict';

const SsrArticlePath = {
  $ARTICLE_ID: `/:id`,
  $ARTICLE_ID_COMMENT: `/:id/comments`,
  EDIT_$ARTICLE_ID: `/edit/:id`,
  ADD: `/add`,
  CATEGORY_$ARTICLE_ID: `/category/:id`,
};

module.exports = {
  SsrArticlePath,
};
