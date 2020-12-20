'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMainPath} = require(`~/common/enums`);

const initMainRouter = (app, settings) => {
  const mainRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.MAIN, mainRouter);

  mainRouter.get(SsrMainPath.ROOT, async (_, res) => {
    const articles = await api.getArticles();

    return res.render(`pages/main`, {
      previews: articles,
      title: `Типотека`,
      hiddenTitle: ` Главная страница личного блога Типотека`,
      description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
      account: null,
      hasContent: true,
      hasHot: true,
      hasLastComments: true,
    });
  });

  mainRouter.get(SsrMainPath.REGISTER, (_, res) => {
    return res.render(`pages/register`, {
      title: `Типотека`,
      error: {
        email: false,
        password: false,
      },
    });
  });

  mainRouter.get(SsrMainPath.LOGIN, (_, res) => {
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
      account: {
        type: `admin`,
        name: `Алёна Фролова`,
        avatar: `img/avatar-2.png`,
      },
    });
  });
};

module.exports = {
  initMainRouter,
};
