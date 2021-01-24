'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMainPath} = require(`~/common/enums`);
const {
  ARTICLES_PER_PAGE,
  ARTICLES_SKIP_PAGE_COUNT,
} = require(`~/common/constants`);

const initMainRouter = (app, settings) => {
  const mainRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (req, res) => {
    const {page = 1} = req.query;
    const parsedPage = Number(page);
    const offset = (parsedPage - ARTICLES_SKIP_PAGE_COUNT) * ARTICLES_PER_PAGE;

    const [{count, articles}, catagories] = await Promise.all([
      api.getPageArticles({
        limit: ARTICLES_PER_PAGE,
        offset,
      }),
      api.getCategories(),
    ]);
    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    return res.render(`pages/main`, {
      totalPages,
      previews: articles,
      themes: catagories,
      page: parsedPage,
      title: `Типотека`,
      hiddenTitle: ` Главная страница личного блога Типотека`,
      description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
      hasHot: true,
      hasLastComments: true,
    });
  });

  mainRouter.get(SsrMainPath.REGISTER, (_req, res) => {
    return res.render(`pages/register`, {
      title: `Типотека`,
      error: {
        email: false,
        password: false,
      },
    });
  });

  mainRouter.get(SsrMainPath.LOGIN, (_req, res) => {
    return res.render(`pages/login`, {
      title: `Типотека`,
      error: {
        email: false,
        password: false,
      },
    });
  });

  mainRouter.get(SsrMainPath.SEARCH, async (req, res) => {
    const {search} = req.query;
    const results = await api.search(search);

    return res.render(`pages/search`, {
      results,
      searchValue: search,
      title: `Типотека`,
      hiddenTitle: ` Страница поиска личного блога Типотека`,
    });
  });
};

module.exports = {
  initMainRouter,
};
