'use strict';

const {Router} = require(`express`);
const {ApiPath, HttpCode, SearchApiPath} = require(`~/common/enums`);

const searchRouter = new Router();

const initSearchApi = (app, {searchService}) => {
  app.use(ApiPath.SEARCH, searchRouter);

  searchRouter.get(SearchApiPath.ROOT, async (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }

    const articles = searchService.findAll(query);

    return res.status(HttpCode.OK).json(articles);
  });
};

module.exports = {
  initSearchApi,
};
