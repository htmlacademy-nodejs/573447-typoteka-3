'use strict';

const {ModelAlias, DbOperator} = require(`~/common/enums`);

class Search {
  constructor({articleModel}) {
    this._Article = articleModel;
  }

  async findAll(titleValue) {
    const articles = await this._Article.findAll({
      where: {
        title: {
          [DbOperator.substring]: titleValue,
        },
      },
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
    });

    return articles.map((offer) => offer.get());
  }
}

module.exports = Search;
