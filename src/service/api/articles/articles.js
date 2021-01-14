'use strict';

const {Router} = require(`express`);
const {ApiPath, HttpCode, ArticlesApiPath} = require(`~/common/enums`);
const {
  existArticle,
  validateComment,
  validateArticle,
} = require(`~/service/middlewares`);

const initArticlesApi = (app, {articlesService, commentsService}) => {
  const articlesRouter = new Router();

  app.use(ApiPath.ARTICLES, articlesRouter);

  articlesRouter.get(ArticlesApiPath.ROOT, async (req, res) => {
    const {offset, limit} = req.query;
    const isUsePagination = Boolean(offset || limit);

    const articles = isUsePagination
      ? await articlesService.findPage({
        offset: Number(offset),
        limit: Number(limit),
      })
      : await articlesService.findAll();

    return res.status(HttpCode.OK).json(articles);
  });

  articlesRouter.post(ArticlesApiPath.ROOT, validateArticle, async (req, res) => {
    const article = await articlesService.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });

  articlesRouter.get(ArticlesApiPath.$ARTICLE_ID, async (req, res) => {
    const {articleId} = req.params;
    const article = await articlesService.findOne(Number(articleId));

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.put(ArticlesApiPath.$ARTICLE_ID, validateArticle, async (req, res) => {
    const {articleId} = req.params;
    const parsedArticleId = Number(articleId);
    const article = await articlesService.findOne(parsedArticleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    const updatedArticle = await articlesService.update(req.body, parsedArticleId);

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  articlesRouter.delete(ArticlesApiPath.$ARTICLE_ID, async (req, res) => {
    const {articleId} = req.params;
    const isArticleDeleted = await articlesService.drop(Number(articleId));

    if (!isArticleDeleted) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(isArticleDeleted);
  });

  articlesRouter.get(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS,
      existArticle(articlesService),
      async (req, res) => {
        const {articleId} = req.params;
        const comments = await commentsService.findAll(Number(articleId));

        return res.status(HttpCode.OK).json(comments);
      }
  );

  articlesRouter.post(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS,
      [existArticle(articlesService), validateComment],
      async (req, res) => {
        const {articleId} = req.params;
        const comment = await commentsService.create(Number(articleId), req.body);

        return res.status(HttpCode.CREATED).json(comment);
      }
  );

  articlesRouter.delete(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS_$COMMENT_ID,
      existArticle(articlesService),
      async (req, res) => {
        const {commentId} = req.params;
        const isCommentDeleted = await commentsService.drop(Number(commentId));

        if (!isCommentDeleted) {
          return res.status(HttpCode.NOT_FOUND).send(`Not found`);
        }

        return res.status(HttpCode.OK).json(isCommentDeleted);
      }
  );
};

module.exports = {
  initArticlesApi
};
