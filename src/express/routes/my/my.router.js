'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMyPath} = require(`~/common/enums`);

const initMyRouter = (app, settings) => {
  const myRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.MY, myRouter);

  myRouter.get(SsrMyPath.ROOT, async (_, res) => {
    const articles = await api.getArticles();

    return res.render(`pages/my/my`, {
      scriptList: [`js/main.js`],
      articles,
    });
  });

  myRouter.get(SsrMyPath.COMMENTS, async (_, res) => {
    const articles = await api.getArticles();

    return res.render(`pages/my/comments`, {
      articles,
    });
  });
};

module.exports = {
  initMyRouter,
};
