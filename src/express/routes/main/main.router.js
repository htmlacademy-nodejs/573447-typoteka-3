'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMainPath, UserKey} = require(`~/common/enums`);
const {checkUserAuthenticate, checkIsAdmin} = require(`~/middlewares`);
const {getHttpErrors} = require(`~/helpers`);
const {
  ARTICLES_PER_PAGE,
  ARTICLES_SKIP_PAGE_COUNT,
} = require(`~/common/constants`);
const {getRegisterData, getLoginData} = require(`./helpers`);

const initMainRouter = (app, settings) => {
  const mainRouter = new Router();
  const {api, storage} = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (req, res) => {
    const {query, session} = req;
    const {page = 1} = query;
    const parsedPage = Number(page);
    const offset = (parsedPage - ARTICLES_SKIP_PAGE_COUNT) * ARTICLES_PER_PAGE;

    const [{count, articles}, categories] = await Promise.all([
      api.getPageArticles({
        limit: ARTICLES_PER_PAGE,
        offset,
      }),
      api.getCategories(),
    ]);
    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    return res.render(`pages/main`, {
      articles,
      totalPages,
      categories,
      lastComments: [],
      hotArticles: [],
      page: parsedPage,
      user: session.user
    });
  });

  mainRouter.get(SsrMainPath.REGISTER, (_req, res) => {
    return res.render(`pages/register`, {
      registerPayload: {},
    });
  });

  mainRouter.post(
      SsrMainPath.REGISTER,
      storage.upload.single(UserKey.AVATAR),
      async (req, res) => {
        const {body, file} = req;
        const registerPayload = getRegisterData(body, file);

        try {
          await api.registerUser(registerPayload);

          return res.redirect(SsrMainPath.LOGIN);
        } catch (err) {
          return res.render(`pages/register`, {
            registerPayload,
            errorMessages: getHttpErrors(err),
          });
        }
      },
  );

  mainRouter.get(SsrMainPath.LOGIN, (_req, res) => {
    return res.render(`pages/login`, {
      loginPayload: {},
    });
  });

  mainRouter.post(SsrMainPath.LOGIN, async (req, res) => {
    const {body, session} = req;
    const loginPayload = getLoginData(body);

    try {
      session.user = await api.loginUser(loginPayload);

      return res.redirect(SsrPath.MAIN);
    } catch (err) {
      return res.render(`pages/login`, {
        loginPayload,
        errorMessages: getHttpErrors(err),
      });
    }
  });

  mainRouter.get(SsrMainPath.LOGOUT, (req, res) => {
    req.session.destroy(() => {
      res.redirect(SsrMainPath.LOGIN);
    });
  });

  mainRouter.get(SsrMainPath.SEARCH, async (req, res) => {
    const {query, session} = req;
    const {search} = query;
    const results = await api.search(search);

    return res.render(`pages/search`, {
      results,
      searchValue: search,
      user: session.user,
    });
  });

  mainRouter.get(
      SsrMainPath.CATEGORIES,
      [checkUserAuthenticate, checkIsAdmin],
      async (_req, res) => {
        const categories = await api.getCategories();

        return res.render(`pages/categories`, {
          categories,
        });
      }
  );
};

module.exports = {
  initMainRouter,
};
