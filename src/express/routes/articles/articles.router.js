'use strict';

const {Router} = require(`express`);
const {getHttpErrors, asyncHandler} = require(`~/helpers`);
const {checkUserAuthenticate, checkIsAdmin} = require(`~/middlewares`);
const {SsrPath, SsrArticlePath, ArticleKey} = require(`~/common/enums`);
const {getArticleData} = require(`./helpers`);

const initArticlesRouter = (app, settings) => {
  const articlesRouter = new Router();
  const {api, storage} = settings;

  app.use(SsrPath.ARTICLES, articlesRouter);

  articlesRouter.get(
      SsrArticlePath.ADD,
      checkIsAdmin,
      asyncHandler(async (req, res) => {
        const categories = await api.getCategories();

        return res.render(`pages/articles/edit`, {
          categories,
          article: {},
          user: req.session.user,
        });
      })
  );


  articlesRouter.post(
      SsrArticlePath.ADD,
      [checkIsAdmin, storage.upload.single(ArticleKey.IMAGE)],
      asyncHandler(async (req, res) => {
        const {body, file, session} = req;
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
            user: session.user,
          });
        }
      })
  );

  articlesRouter.get(
      SsrArticlePath.EDIT_$ARTICLE_ID,
      checkIsAdmin,
      asyncHandler(async (req, res) => {
        const {params, session} = req;
        const {id} = params;
        const [article, categories] = await Promise.all([
          api.getArticle(id),
          api.getCategories(),
        ]);

        return res.render(`pages/articles/edit`, {
          article,
          categories,
          user: session.user,
        });
      })
  );


  articlesRouter.post(
      SsrArticlePath.EDIT_$ARTICLE_ID,
      [checkIsAdmin, storage.upload.single(ArticleKey.IMAGE)],
      asyncHandler(async (req, res) => {
        const {body, file, params, session} = req;
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
              ...articleData,
            },
            errorMessages: getHttpErrors(err),
            user: session.user,
          });
        }
      })
  );

  articlesRouter.get(
      SsrArticlePath.$ARTICLE_ID,
      asyncHandler(async (req, res) => {
        const {params, session} = req;
        const {id} = params;
        const [article, categories] = await Promise.all([
          api.getArticle(id),
          api.getCategories(),
        ]);

        return res.render(`pages/articles/article`, {
          article,
          categories,
          user: session.user,
        });
      })
  );

  articlesRouter.get(
      SsrArticlePath.CATEGORY_$CATEGORY_ID,
      asyncHandler((req, res) => {
        return res.render(`pages/articles/categories`, {
          title: `Типотека`,
          displayedTitle: `Бизнес`,
          description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
          hasContent: true,
          hasHot: true,
          hasLastComments: true,
          user: req.session.user,
        });
      })
  );

  articlesRouter.post(
      [checkUserAuthenticate, SsrArticlePath.$ARTICLE_ID_COMMENT],
      asyncHandler(async (req, res) => {
        const {body, params, session} = req;
        const parsedComment = Number(params.id);
        const {comment} = body;

        try {
          await api.createComment(parsedComment, {
            text: comment,
          });

          return res.redirect(`${SsrPath.ARTICLES}/${parsedComment}`);
        } catch (err) {
          const categories = await api.getCategories();
          const article = await api.getArticle(parsedComment);

          return res.render(`pages/articles/article`, {
            article,
            comment,
            categories,
            errorMessages: getHttpErrors(err),
            user: session.user,
          });
        }
      })
  );
};

module.exports = {
  initArticlesRouter,
};
