'use strict';

const {Router} = require(`express`);
const {Search, Category, Articles, Comments} = require(`~/service/data`);
const {initSearchApi} = require(`./search/search`);
const {initCategoryApi} = require(`./category/category`);
const {initArticlesApi} = require(`./articles/articles`);
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

  initArticlesApi(apiRouter, {
    articlesService: new Articles({
      articles: mockedData,
    }),
    commentsService: new Comments(),
  });
})();

module.exports = apiRouter;
