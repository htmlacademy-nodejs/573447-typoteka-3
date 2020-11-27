'use strict';

const {Router} = require(`express`);
const {ApiArticlesRoute} = require(`~/common/enums`);

const articlesRouter = new Router();

articlesRouter.get(ApiArticlesRoute.ARTICLE, (req, res) => res.send(req.path));
articlesRouter.get(ApiArticlesRoute.EDIT, (req, res) => res.send(req.path));
articlesRouter.get(ApiArticlesRoute.ADD, (req, res) => res.send(req.path));
articlesRouter.get(ApiArticlesRoute.CATEGORY, (req, res) => res.send(req.path));

module.exports = articlesRouter;
