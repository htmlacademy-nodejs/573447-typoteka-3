'use strict';

require(`module-alias/register`);
const path = require(`path`);
const express = require(`express`);
const {Api} = require(`~/express/services`);
const {HttpCode} = require(`~/common/enums`);
const {initMainRouter} = require(`~/express/routes/main/main.router`);
const {initMyRouter} = require(`~/express/routes/my/my.router`);
const {initArticlesRouter} = require(`~/express/routes/articles/articles.router`);
const {AppConfig} = require(`./common`);

const app = express();
const api = new Api({
  baseURL: AppConfig.API_URL,
  timeout: AppConfig.API_TIMEOUT,
});
const routerSettings = {
  api,
};
const routerInits = [initMainRouter, initMyRouter, initArticlesRouter];

routerInits.forEach((initRouter) => {
  initRouter(app, routerSettings);
});

app.use(express.static(path.resolve(__dirname, AppConfig.PUBLIC_DIR)));

app.use((_, res) =>
  res.status(HttpCode.BAD_REQUEST).render(`pages/errors/404`)
);
app.use((_err, _req, res, _next) => {
  console.log(_err);
  return res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`pages/errors/500`);
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(AppConfig.DEFAULT_PORT);
