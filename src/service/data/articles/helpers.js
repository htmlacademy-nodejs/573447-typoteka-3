'use strict';

const {getRandomId, getItemByKey, removeItemByKey} = require(`~/helpers`);
const {ArticleKey} = require(`~/common/enums`);

const getArticleById = (articles, id) => {
  const articleById = getItemByKey(articles, ArticleKey.ID, id);

  return articleById;
};

const getNewArticle = (article) => {
  const newArticle = {
    ...article,
    [ArticleKey.ID]: getRandomId(),
    [ArticleKey.COMMENTS]: [],
    [ArticleKey.CREATED_DATE]: new Date().toISOString(),
  };

  return newArticle;
};

const updateArticle = (articles, articleId, updatedArticle) => {
  const updatedArticles = articles.map((article) =>
    article.id === articleId ? {...article, ...updatedArticle} : article
  );

  return updatedArticles;
};

const removeArticle = (articles, removedArticle) => {
  const updatedArticles = removeItemByKey(articles, ArticleKey.ID, removedArticle.id);

  return updatedArticles;
};

module.exports = {
  getArticleById,
  getNewArticle,
  updateArticle,
  removeArticle
};
