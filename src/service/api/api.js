'use strict';

const {Router} = require(`express`);
const sequelize = require(`~/service/db/db`);
const {defineModels} = require(`~/service/db/define-models`);
const {Search, Category, Articles, Comments, Users} = require(`~/service/data`);
const {initSearchApi} = require(`./search/search`);
const {initCategoryApi} = require(`./category/category`);
const {initArticlesApi} = require(`./articles/articles`);
const {initUsersApi} = require(`./users/users`);

defineModels(sequelize);

const apiRouter = new Router();
const {models} = sequelize;

initUsersApi(apiRouter, {
  usersService: new Users({
    userModel: models.User,
  }),
});

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
