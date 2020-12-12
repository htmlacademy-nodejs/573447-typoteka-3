'use strict';

const {getUniqueItems} = require(`~/helpers`);
const {getCategories} = require(`./helpers`);

class Category {
  constructor({offers}) {
    this._offers = offers;
  }

  findAll() {
    const categories = getUniqueItems(getCategories(this._offers));

    return categories;
  }
}

module.exports = Category;
