'use strict';

const {Router} = require(`express`);
const {getHttpErrors} = require(`~/helpers`);
const {SsrPath, SsrArticlePath} = require(`~/common/enums`);
const {getArticleData} = require(`./helpers`);

const initArticlesRouter = (app, settings) => {
  const articlesRouter = new Router();
  const {api, storage} = settings;

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

  articlesRouter.get(SsrArticlePath.ADD, async (_req, res) => {
    const categories = await api.getCategories();

    return res.render(`pages/articles/edit`, {
      categories,
      article: {},
      account: {
        type: `admin`,
      },
    });
  });


  articlesRouter.post(
      SsrArticlePath.ADD,
      storage.upload.single(`avatar`),
      async (req, res) => {
        const {body, file} = req;
        const articleData = getArticleData(body, file);

        try {
          await api.createArticle(articleData);

          return res.redirect(SsrPath.MY);
        } catch (err) {
          const categories = await api.getCategories();

          return res.render(`pages/articles/edit`, {
            categories,
            article: articleData,
            errorMessages: getHttpErrors(err),
            account: {
              type: `admin`,
            },
          });
        }
      }
  );

  articlesRouter.post(
      SsrArticlePath.EDIT_$ARTICLE_ID,
      storage.upload.single(`avatar`),
      async (req, res) => {
        const {body, file, params} = req;
        const {id} = params;
        const parsedId = Number(id);
        const articleData = getArticleData(body, file);

        try {
          await api.updateArticle(parsedId, articleData);

          return res.redirect(SsrPath.MY);
        } catch (err) {
          const article = await api.getArticle(parsedId);
          const categories = await api.getCategories();

          return res.render(`pages/articles/edit`, {
            categories,
            article: {
              ...article,
              ...articleData
            },
            errorMessages: getHttpErrors(err),
            account: {
              type: `admin`,
            },
          });
        }
      },
  );

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

  articlesRouter.get(SsrArticlePath.CATEGORY_$ARTICLE_ID, (_req, res) => {
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
