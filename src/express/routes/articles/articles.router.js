'use strict';

const {Router} = require(`express`);
const {getHttpErrors, asyncHandler, calculatePagination, getTotalPagesCount} = require(`~/helpers`);
const {checkUserAuthenticate, checkIsAdmin} = require(`~/middlewares`);
const {SsrPath, SsrArticlePath, ArticleKey} = require(`~/common/enums`);
const {ARTICLES_PER_PAGE} = require(`~/common/constants`);
const {getArticleData, getCommentsData, getMessageByField} = require(`./helpers`);

const initArticlesRouter = (app, settings) => {
  const articlesRouter = new Router();
  const {api, storage} = settings;

  app.use(SsrPath.ARTICLES, articlesRouter);

  articlesRouter.get(
      SsrArticlePath.ADD,
      [checkUserAuthenticate, checkIsAdmin],
      asyncHandler(async (req, res) => {
        const categories = await api.getCategories();

        return res.render(`pages/articles/edit`, {
          categories,
          article: {},
          messagesByField: {},
          user: req.session.user,
        });
      })
  );

  articlesRouter.post(
      SsrArticlePath.ADD,
      [checkUserAuthenticate, checkIsAdmin, storage.upload.single(ArticleKey.IMAGE)],
      asyncHandler(async (req, res) => {
        const {body, file, session} = req;
        const articleData = getArticleData(body, file);

        try {
          await api.createArticle(articleData);

          return res.redirect(SsrPath.MY);
        } catch (err) {
          const categories = await api.getCategories();
          const httpErrors = getHttpErrors(err);

          return res.render(`pages/articles/edit`, {
            categories,
            article: articleData,
            errorMessages: httpErrors,
            messagesByField: getMessageByField(httpErrors),
            user: session.user,
          });
        }
      })
  );

  articlesRouter.get(
      SsrArticlePath.EDIT_$ARTICLE_ID,
      [checkUserAuthenticate, checkIsAdmin],
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
          messagesByField: {},
          user: session.user,
        });
      })
  );


  articlesRouter.post(
      SsrArticlePath.EDIT_$ARTICLE_ID,
      [checkUserAuthenticate, checkIsAdmin, storage.upload.single(ArticleKey.IMAGE)],
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
          const httpErrors = getHttpErrors(err);

          return res.render(`pages/articles/edit`, {
            categories,
            article: {
              ...article,
              ...articleData,
            },
            messagesByField: getMessageByField(httpErrors),
            errorMessages: httpErrors,
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
        const article = await api.getArticle(id);

        return res.render(`pages/articles/article`, {
          article,
          commentData: {},
          user: session.user,
        });
      })
  );

  articlesRouter.get(
      SsrArticlePath.CATEGORY_$CATEGORY_ID,
      asyncHandler(async (req, res) => {
        const {session, params, query} = req;
        const {id} = params;
        const {currentPage, limit, offset} = calculatePagination(
            query.page,
            ARTICLES_PER_PAGE
        );

        const [
          {count, articles},
          currentCategory,
          categories,
        ] = await Promise.all([
          api.getArticleByCategoryId({
            id,
            limit,
            offset,
          }),
          api.getCategory(id),
          api.getCategories(true),
        ]);
        const totalPagesCount = getTotalPagesCount(count, ARTICLES_PER_PAGE);

        return res.render(`pages/articles/categories`, {
          currentCategory,
          categories,
          articles,
          currentPage,
          totalPagesCount,
          user: session.user,
        });
      })
  );

  articlesRouter.post(
      [checkUserAuthenticate, SsrArticlePath.$ARTICLE_ID_COMMENT],
      asyncHandler(async (req, res) => {
        const {body, params, session} = req;
        const parsedComment = Number(params.id);
        const commentData = getCommentsData(body);

        try {
          await api.createComment(parsedComment, commentData);

          return res.redirect(`${SsrPath.ARTICLES}/${parsedComment}`);
        } catch (err) {
          const categories = await api.getCategories();
          const article = await api.getArticle(parsedComment);

          return res.render(`pages/articles/article`, {
            article,
            commentData,
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
