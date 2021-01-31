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

  async findAllWithCount() {
    const categories = await this._Category.findAll({
      attributes: {
        include: [Sequelize.fn(`COUNT`, Sequelize.col(`articleCategories.CategoryId`)), `count`],
      },
      include: {
        model: this._ArticleCategory,
        as: ModelAlias.ARTICLE_CATEGORIES,
        attributes: [],
        duplicating: false
      },
      group: [Sequelize.col(`Category.id`)],
      having: Sequelize.where(
          Sequelize.fn(`COUNT`, Sequelize.col(`articleCategories.CategoryId`)),
          {
            [DbOperator.gte]: 1,
          }
      ),
    });

    return categories.map((category) => category.get());
  }
}

module.exports = Category;
