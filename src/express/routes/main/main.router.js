'use strict';

const {Router} = require(`express`);
const {
  SsrPath,
  SsrMainPath,
  UserKey,
  SortType,
  AdminAction,
} = require(`~/common/enums`);
const {checkUserAuthenticate, checkIsAdmin} = require(`~/middlewares`);
const {
  getHttpErrors,
  calculatePagination,
  getTotalPagesCount,
} = require(`~/helpers`);
const {ARTICLES_PER_PAGE} = require(`~/common/constants`);
const {getRegisterData, getLoginData, getCategoryData} = require(`./helpers`);
const {HOT_ARTICLES_COUNT, LAST_COMMENTS_COUNT} = require(`./common`);

const initMainRouter = (app, settings) => {
  const mainRouter = new Router();
  const {api, storage} = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (req, res) => {
    const {query, session} = req;
    const {currentPage, limit, offset} = calculatePagination(
        query.page,
        ARTICLES_PER_PAGE
    );

    const [
      {count, articles},
      hotArticles,
      lastComments,
      categories,
    ] = await Promise.all([
      api.getPageArticles({
        limit,
        offset,
      }),
      api.getHotArticles({
        limit: HOT_ARTICLES_COUNT,
      }),
      api.getComments({
        limit: LAST_COMMENTS_COUNT,
        order: SortType.DESC,
      }),
      api.getCategories(true),
    ]);
    const totalPagesCount = getTotalPagesCount(count, ARTICLES_PER_PAGE);

    return res.render(`pages/main`, {
      articles,
      categories,
      hotArticles,
      lastComments,
      currentPage,
      totalPagesCount,
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
      async (req, res) => {
        const [categories, categoriesWithCount] = await Promise.all([
          api.getCategories(),
          api.getCategories(true),
        ]);

        return res.render(`pages/categories`, {
          categories,
          categoriesWithCount,
          user: req.session.user,
        });
      }
  );

  mainRouter.post(
      SsrMainPath.CATEGORIES,
      [checkUserAuthenticate, checkIsAdmin],
      async (req, res) => {
        const {body} = req;

        try {
          const categoryPayload = getCategoryData(body);

          await api.saveCategory(categoryPayload);

          return res.redirect(SsrMainPath.CATEGORIES);
        } catch (err) {
          const [categories, categoriesWithCount] = await Promise.all([
            api.getCategories(),
            api.getCategories(true),
          ]);

          return res.render(`pages/categories`, {
            categories,
            categoriesWithCount,
            errorMessages: getHttpErrors(err),
            user: req.session.user,
          });
        }
      }
  );

  mainRouter.post(
      SsrMainPath.CATEGORIES_$CATEGORY_ID,
      [checkUserAuthenticate, checkIsAdmin],
      async (req, res) => {
        const {body, params} = req;
        const {action} = body;
        const {id: categoryId} = params;

        switch (action) {
          case AdminAction.EDIT_CATEGORY: {
            try {
              const categoryPayload = getCategoryData(body);

              await api.updateCategory(categoryId, categoryPayload);
            } catch (err) {
              const [categories, categoriesWithCount] = await Promise.all([
                api.getCategories(),
                api.getCategories(true),
              ]);

              return res.render(`pages/categories`, {
                categories,
                categoriesWithCount,
                errorMessages: getHttpErrors(err),
                user: req.session.user,
              });
            }
            break;
          }
          case AdminAction.DELETE_CATEGORY: {
            await api.deleteCategory(categoryId);
            break;
          }
        }

        return res.redirect(SsrMainPath.CATEGORIES);
      }
  );
};

module.exports = {
  initMainRouter,
};
