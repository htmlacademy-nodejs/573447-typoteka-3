'use strict';

require(`module-alias/register`);
const path = require(`path`);
const express = require(`express`);
const {SsrPath, HttpCode, ENV} = require(`~/common/enums`);
const mainRouter = require(`~/express/routes/main/main.router`);
const myRouter = require(`~/express/routes/my/my.router`);
const articlesRouter = require(`~/express/routes/articles/articles.router`);

const PUBLIC_DIR = `public`;
const DEFAULT_PORT = 8080;

const app = express();

app.use(SsrPath.MAIN, mainRouter);
app.use(SsrPath.MY, myRouter);
app.use(SsrPath.ARTICLES, articlesRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((_, res) =>
  res.status(HttpCode.BAD_REQUEST).render(`pages/errors/404`)
);
app.use((_err, _req, res, _next) =>
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`pages/errors/500`)
);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(ENV.PORT || DEFAULT_PORT);
