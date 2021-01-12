'use strict';

const {ModelAlias} = require(`~/common/enums`);

class Articles {
  constructor({articleModel}) {
    this._Article = articleModel;
  }

  async findAll() {
    const offers = await this._Article.findAll({
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
    });

    return offers.map((item) => item.get());
  }

  findOne(id) {
    return this._Article.findByPk(id, {
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
    });
  }

  async create(createdArticle) {
    const article = await this._Article.create(createdArticle);

    await article.addCategories(createdArticle.categories);

    return article.get();
  }

  async update(article, articleId) {
    const [affectedRows] = await this._Article.update(article, {
      where: {
        id: articleId,
      },
    });

    return Boolean(affectedRows);
  }

  async drop(articleId) {
    const deletedRows = await this._Article.destroy({
      where: {
        id: articleId,
      },
    });

    return Boolean(deletedRows);
  }
}

module.exports = Articles;
