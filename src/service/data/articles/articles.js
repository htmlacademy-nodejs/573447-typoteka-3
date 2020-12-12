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

  update(article) {
    this._articles = updateArticle(this._articles, article);

    return article;
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
