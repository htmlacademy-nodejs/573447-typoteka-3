'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrArticlePath, ArticleKey} = require(`~/common/enums`);

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

  articlesRouter.get(SsrArticlePath.ADD, async (_, res) => {
    const categories = await api.getCategories();

    return res.render(`pages/articles/edit`, {
      categories,
      article: {},
      account: {
        type: `admin`,
      },
    });
  });


  articlesRouter.post(SsrArticlePath.ADD, storage.upload.single(`avatar`), async (req, res) => {
    const {body, file} = req;
    const articleData = {
      [ArticleKey.IMAGE]: file.filename,
      [ArticleKey.TITLE]: body.title,
      [ArticleKey.ANNOUNCE]: body.announce,
      [ArticleKey.CREATED_DATE]: body.createdDate,
      [ArticleKey.FULL_TEXT]: body.fullText,
      [ArticleKey.CATEGORY]: body.category,
    };

    try {
      await api.createArticle(articleData);

      return res.redirect(SsrPath.MY);
    } catch (err) {
      const categories = await api.getCategories();

      return res.render(`pages/articles/edit`, {
        article: articleData,
        categories,
        account: {
          type: `admin`,
        },
      });
    }
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
