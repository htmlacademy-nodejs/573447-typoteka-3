'use strict';

const {Router} = require(`express`);
const {Search, Category} = require(`~/service/data`);
const {initSearchApi} = require(`./search/search`);
const {initCategoryApi} = require(`./category/category`);
const {getMockedDate} = require(`./helpers`);

const apiRouter = new Router();

(async () => {
  const mockedData = await getMockedDate();

  initSearchApi(apiRouter, {
    searchService: new Search({
      articles: mockedData,
    }),
  });

  initCategoryApi(apiRouter, {
    categoryService: new Category({
      articles: mockedData,
    }),
  });
})();

module.exports = apiRouter;
