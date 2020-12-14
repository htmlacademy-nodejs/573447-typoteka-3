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

  articlesRouter.get(ArticlesApiPath.ROOT, (_req, res) => {
    const articles = articlesService.findAll();

    return res.status(HttpCode.OK).json(articles);
  });

  articlesRouter.post(ArticlesApiPath.ROOT, validateArticle, (req, res) => {
    const article = articlesService.create(req.body);

    return res.status(HttpCode.CREATED).json(article);
  });

  articlesRouter.get(ArticlesApiPath.$ARTICLE_ID, (req, res) => {
    const {articleId} = req.params;
    const article = articlesService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.put(ArticlesApiPath.$ARTICLE_ID, validateArticle, (req, res) => {
    const {articleId} = req.params;
    const article = articlesService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found with ${articleId}`);
    }

    const updatedArticle = articlesService.update(req.body, articleId);

    return res.status(HttpCode.OK).json(updatedArticle);
  });

  articlesRouter.delete(ArticlesApiPath.$ARTICLE_ID, (req, res) => {
    const {articleId} = req.params;
    const article = articlesService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  articlesRouter.get(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS,
      existArticle(articlesService),
      (_, res) => {
        const {article} = res.locals;
        const comments = commentsService.findAll(article);

        return res.status(HttpCode.OK).json(comments);
      }
  );

  articlesRouter.post(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS,
      [existArticle(articlesService), validateComment],
      (req, res) => {
        const {article} = res.locals;
        const comment = commentsService.create(article, req.body);

        return res.status(HttpCode.CREATED).json(comment);
      }
  );

  articlesRouter.delete(
      ArticlesApiPath.$ARTICLE_ID_COMMENTS_$COMMENT_ID,
      existArticle(articlesService),
      (req, res) => {
        const {article} = res.locals;
        const {commentId} = req.params;
        const deletedComment = commentsService.drop(article, commentId);

        if (!deletedComment) {
          return res.status(HttpCode.NOT_FOUND).send(`Not found`);
        }

        return res.status(HttpCode.OK).json(deletedComment);
      }
  );
};

module.exports = {
  initArticlesApi
};
