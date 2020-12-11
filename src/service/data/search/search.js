'use strict';

const {getArticlesByTitleValue} = require(`./helpers`);

class Search {
  constructor({articles}) {
    this._articles = articles;
  }

  findAll(titleValue) {
    const articlesByTitleValue = getArticlesByTitleValue(
        this._articles,
        titleValue
    );

    return articlesByTitleValue;
  }
}

module.exports = Search;
