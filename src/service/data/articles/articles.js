'use strict';

const {
  getArticleById,
  getNewArticle,
  updateArticle,
  removeArticle,
} = require(`./helpers`);

class Articles {
  constructor({articles}) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    const articleById = getArticleById(this._articles, id);

    return articleById;
  }

  create(article) {
    const newArticle = getNewArticle(article);

    this._articles.push(newArticle);

    return newArticle;
  }

  update(article, articleId) {
    this._articles = updateArticle(this._articles, articleId, article);

    const updatedArticle = getArticleById(this._articles, articleId);

    return updatedArticle;
  }

  drop(id) {
    const deletedArticle = getArticleById(this._articles, id);

    if (!deletedArticle) {
      return null;
    }

    this._articles = removeArticle(this._articles, deletedArticle);

    return deletedArticle;
  }
}

module.exports = Articles;
