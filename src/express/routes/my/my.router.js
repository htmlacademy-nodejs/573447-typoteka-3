'use strict';

const {Router} = require(`express`);
const {ApiMyRoute} = require(`~/common/enums`);

const myRouter = new Router();

myRouter.get(ApiMyRoute.ROOT, (req, res) => res.send(req.path));
myRouter.get(ApiMyRoute.COMMENTS, (req, res) => res.send(req.path));

module.exports = myRouter;
