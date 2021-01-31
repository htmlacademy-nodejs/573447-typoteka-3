'use strict';

const {Sequelize} = require(`sequelize`);
const {
  ModelAlias,
  SortType,
  ArticleKey,
  CommentKey,
  CategoryKey,
  DbOperator,
} = require(`~/common/enums`);

class Articles {
  constructor({articleModel, commentModel, categoryModel}) {
    this._Article = articleModel;
    this._Comment = commentModel;
    this._Category = categoryModel;
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
    });

    return articles.map((item) => item.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
      distinct: true,
    });

    return {
      count,
      articles: rows.map((item) => item.get()),
    };
  }

  async findMostCommented(limit) {
    const articles = await this._Article.findAll({
      limit,
      attributes: {
        include: [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `count`],
      },
      include: {
        model: this._Comment,
        as: ModelAlias.COMMENTS,
        attributes: [],
        duplicating: false
      },
      group: [Sequelize.col(`Article.id`)],
      having: Sequelize.where(
          Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)),
          {
            [DbOperator.gte]: 1,
          }
      ),
      order: [[`count`, SortType.DESC]],
    });

    return articles.map((article) => article.get());
  }

  findOne(id) {
    return this._Article.findByPk(id, {
      include: [
        ModelAlias.CATEGORIES,
        {
          model: this._Comment,
          as: ModelAlias.COMMENTS,
          include: [ModelAlias.USER]
        },
      ],
      order: [[ModelAlias.COMMENTS, CommentKey.CREATED_AT, SortType.DESC]],
    });
  }

  findByCategoryId(categoryId) {
    return this._Article.findAll({
      include: [
        ModelAlias.COMMENTS,
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          where: {
            [CategoryKey.ID]: categoryId,
          },
        },
      ],
      order: [[ArticleKey.CREATED_DATE, SortType.DESC]],
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
