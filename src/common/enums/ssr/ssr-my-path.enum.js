'use strict';

const SsrMyPath = {
  ROOT: `/`,
  $ARTICLE_ID: `/:id`,
  COMMENTS: `/comments`,
  ARTICLES_$ARTICLE_ID_COMMENTS_$COMMENT_ID: `/articles/:articleId/comments/:commentId`,
};

module.exports = {
  SsrMyPath,
};
