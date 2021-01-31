'use strict';

const ArticlesApiPath = {
  ROOT: `/`,
  POPULAR: `/popular`,
  COMMENTS: `/comments`,
  CATEGORIES_$ID: `/categories/:id`,
  $ARTICLE_ID: `/:articleId`,
  $ARTICLE_ID_COMMENTS: `/:articleId/comments`,
  $ARTICLE_ID_COMMENTS_$COMMENT_ID: `/:articleId/comments/:commentId`,
};

module.exports = {
  ArticlesApiPath,
};
