'use strict';

require(`module-alias/register`);
const express = require(`express`);
const {ApiRoute} = require(`~/common/enums`);
const mainRouter = require(`~/express/routes/main/main.router`);
const myRouter = require(`~/express/routes/my/my.router`);
const articlesRouter = require(`~/express/routes/articles/articles.router`);

const DEFAULT_PORT = 8080;

const app = express();

app.use(ApiRoute.MAIN, mainRouter);
app.use(ApiRoute.MY, myRouter);
app.use(ApiRoute.ARTICLES, articlesRouter);

app.listen(DEFAULT_PORT);
