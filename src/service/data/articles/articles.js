'use strict';

const {ModelAlias} = require(`~/common/enums`);

class Articles {
  constructor({articleModel}) {
    this._Article = articleModel;
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
    });

    return articles.map((item) => item.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
      distinct: true,
    });

    return {
      count,
      articles: rows.map((item) => item.get()),
    };
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
