'use strict';

const {Router} = require(`express`);
const {ApiMainRoute} = require(`~/common/enums`);

const mainRouter = new Router();

mainRouter.get(ApiMainRoute.ROOT, (req, res) => res.send(req.path));
mainRouter.get(ApiMainRoute.REGISTER, (req, res) => res.send(req.path));
mainRouter.get(ApiMainRoute.LOGIN, (req, res) => res.send(req.path));
mainRouter.get(ApiMainRoute.SEARCH, (req, res) => res.send(req.path));

module.exports = mainRouter;
