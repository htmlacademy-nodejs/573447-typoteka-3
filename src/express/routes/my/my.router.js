'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMyPath} = require(`~/common/enums`);
const {checkUserAuthenticate, checkIsAdmin} = require(`~/middlewares`);

const initMyRouter = (app, settings) => {
  const myRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.MY, myRouter);

  myRouter.get(
      SsrMyPath.ROOT,
      [checkUserAuthenticate, checkIsAdmin],
      async (req, res) => {
        const articles = await api.getArticles();

        return res.render(`pages/my/my`, {
          articles,
          user: req.session.user,
        });
      }
  );

  myRouter.get(
      SsrMyPath.COMMENTS,
      [checkUserAuthenticate, checkIsAdmin],
      async (req, res) => {
        const articles = await api.getArticles();

        return res.render(`pages/my/comments`, {
          articles,
          user: req.session.user,
        });
      }
  );
};

module.exports = {
  initMyRouter,
};
