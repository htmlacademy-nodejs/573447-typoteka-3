'use strict';

const ArticlesApiPath = {
  ROOT: `/`,
  POPULAR: `/popular`,
  $ARTICLE_ID: `/:articleId`,
  $ARTICLE_ID_COMMENTS: `/:articleId/comments`,
  $ARTICLE_ID_COMMENTS_$COMMENT_ID: `/:articleId/comments/:commentId`,
};

module.exports = {
  ArticlesApiPath,
};
