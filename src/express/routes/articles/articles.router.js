'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrArticlePath} = require(`~/common/enums`);

const initArticlesRouter = (app, settings) => {
  const articlesRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.ARTICLES, articlesRouter);

  articlesRouter.get(SsrArticlePath.EDIT_$ARTICLE_ID, async (req, res) => {
    const {id} = req.params;
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories(),
    ]);

    return res.render(`pages/articles/edit`, {
      article,
      categories,
      account: {
        type: `admin`,
      },
    });
  });

  articlesRouter.get(SsrArticlePath.ADD, (_, res) => {
    return res.render(`pages/articles/edit`, {
      account: {
        type: `admin`,
      },
    });
  });

  articlesRouter.get(SsrArticlePath.$ARTICLE_ID, async (req, res) => {
    const {id} = req.params;
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories(),
    ]);

    return res.render(`pages/articles/article`, {
      article,
      themes: categories,
      account: {
        type: `user`,
        name: `Алёна Фролова`,
        avatar: `img/avatar-2.png`,
      },
    });
  });

  articlesRouter.get(SsrArticlePath.CATEGORY_$ARTICLE_ID, (_, res) => {
    return res.render(`pages/articles/categories`, {
      title: `Типотека`,
      displayedTitle: `Бизнес`,
      description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
      account: {
        type: `user`,
        name: `Алёна Фролова`,
        avatar: `img/avatar-2.png`,
      },
      hasContent: true,
      hasHot: true,
      hasLastComments: true,
    });
  });
};

module.exports = {
  initArticlesRouter,
};
