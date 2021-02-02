'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMyPath, AdminAction} = require(`~/common/enums`);
const {asyncHandler} = require(`~/helpers`);
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

  myRouter.post(
      SsrMyPath.$ARTICLE_ID,
      [checkUserAuthenticate, checkIsAdmin],
      asyncHandler(async (req, res) => {
        const {body, params} = req;
        const {action} = body;

        switch (action) {
          case AdminAction.DELETE_ARTICLE: {
            await api.deleteArticle(params.id);
          }
        }

        return res.redirect(SsrPath.MY);
      })
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
