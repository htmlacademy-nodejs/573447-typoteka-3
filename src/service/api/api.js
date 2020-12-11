'use strict';

const {Router} = require(`express`);
const {Search} = require(`~/service/data`);
const {initSearchApi} = require(`./search/search`);
const {getMockedDate} = require(`./helpers`);

const apiRouter = new Router();

(async () => {
  const mockedData = await getMockedDate();

  initSearchApi(apiRouter, {
    searchService: new Search({
      articles: mockedData,
    }),
  });
})();

module.exports = apiRouter;
