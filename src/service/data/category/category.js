'use strict';

class Category {
  constructor({categoryModel}) {
    this._Category = categoryModel;
  }

  findAll() {
    return this._Category.findAll({
      raw: true,
    });
  }
}

module.exports = Category;
