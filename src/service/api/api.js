'use strict';

const {Router} = require(`express`);
const sequelize = require(`~/db/db`);
const {defineModels} = require(`~/db/define-models`);
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
    articleCategoryModel: models.ArticleCategory,
  }),
});

initArticlesApi(apiRouter, {
  articlesService: new Articles({
    articleModel: models.Article,
    commentModel: models.Comment,
    categoryModel: models.Category,
    articleCategoryModel: models.ArticleCategory,
  }),
  commentsService: new Comments({
    commentModel: models.Comment,
  }),
});

module.exports = apiRouter;
