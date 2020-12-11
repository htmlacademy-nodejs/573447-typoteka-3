'use strict';

const getArticlesByTitleValue = (articles, titleValue) => {
  const articlesByTitleValue = articles.filter((article) =>
    article.title.includes(titleValue)
  );

  return articlesByTitleValue;
};

module.exports = {
  getArticlesByTitleValue,
};
