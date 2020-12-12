'use strict';

const {getUniqueItems} = require(`~/helpers`);
const {getCategories} = require(`./helpers`);

class Category {
  constructor({articles}) {
    this._articles = articles;
  }

  findAll() {
    const categories = getUniqueItems(getCategories(this._articles));

    return categories;
  }
}

module.exports = Category;
