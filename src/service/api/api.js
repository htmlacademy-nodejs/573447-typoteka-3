'use strict';

const {Router} = require(`express`);
const sequelize = require(`~/service/db/db`);
const {defineModels} = require(`~/service/db/define-models`);
const {Search, Category, Articles, Comments} = require(`~/service/data`);
const {initSearchApi} = require(`./search/search`);
const {initCategoryApi} = require(`./category/category`);
const {initArticlesApi} = require(`./articles/articles`);

defineModels(sequelize);

const apiRouter = new Router();
const {models} = sequelize;

initSearchApi(apiRouter, {
  searchService: new Search({
    articleModel: models.Article,
  }),
});

initCategoryApi(apiRouter, {
  categoryService: new Category({
    categoryModel: models.Category,
  }),
});

initArticlesApi(apiRouter, {
  articlesService: new Articles({
    articleModel: models.Article,
  }),
  commentsService: new Comments({
    commentModel: models.Comment,
  }),
});

module.exports = apiRouter;
