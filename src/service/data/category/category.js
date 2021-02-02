'use strict';

const {Sequelize} = require(`sequelize`);
const {DbOperator, ModelAlias} = require(`~/common/enums`);

class Category {
  constructor({categoryModel, articleCategoryModel}) {
    this._Category = categoryModel;
    this._ArticleCategory = articleCategoryModel;
  }

  findAll() {
    return this._Category.findAll({
      raw: true,
    });
  }

  findOne(id) {
    return this._Category.findByPk(id, {
      raw: true
    });
  }

  async findAllWithCount() {
    const categories = await this._Category.findAll({
      attributes: {
        include: [Sequelize.fn(`COUNT`, Sequelize.col(`articleCategories.categoryId`)), `count`],
      },
      include: {
        model: this._ArticleCategory,
        as: ModelAlias.ARTICLE_CATEGORIES,
        attributes: [],
        duplicating: false
      },
      group: [Sequelize.col(`Category.id`)],
      having: Sequelize.where(
          Sequelize.fn(`COUNT`, Sequelize.col(`articleCategories.categoryId`)),
          {
            [DbOperator.gte]: 1,
          }
      ),
    });

    return categories.map((category) => category.get());
  }

  create(categoryPayload) {
    return this._Category.create(categoryPayload);
  }

  async update(categoryId, categoryPayload) {
    const [rows] = await this._Category.update(categoryPayload, {
      where: {
        id: categoryId,
      },
    });

    return Boolean(rows);
  }

  async drop(categoryId) {
    const deletedRows = await this._Category.destroy({
      where: {
        id: categoryId,
      },
    });

    return Boolean(deletedRows);
  }
}

module.exports = Category;
