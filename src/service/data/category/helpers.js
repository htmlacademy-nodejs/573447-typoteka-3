'use strict';

const getCategories = (articles) => {
  const categories = articles.reduce(
      (acc, article) => [...acc, ...article.category],
      []
  );

  return categories;
};

module.exports = {
  getCategories,
};
