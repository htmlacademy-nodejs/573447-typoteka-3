'use strict';

const {Router} = require(`express`);
const {validateParamSchema} = require(`~/middlewares`);
const {routeId: routeIdSchema} = require(`~/schemas`);
const {
  ApiPath,
  CategoryApiPath,
  HttpCode,
  RequestParam,
} = require(`~/common/enums`);

const initCategoryApi = (app, {categoryService}) => {
  const categoryRouter = new Router();

  app.use(ApiPath.CATEGORIES, categoryRouter);

  categoryRouter.get(CategoryApiPath.ROOT, async (req, res) => {
    const {hasCount} = req.query;
    const categories = hasCount
      ? await categoryService.findAllWithCount()
      : await categoryService.findAll();

    return res.status(HttpCode.OK).json(categories);
  });

  categoryRouter.get(
      CategoryApiPath.$ID,
      validateParamSchema(routeIdSchema, RequestParam.ID),
      async (req, res) => {
        const {id} = req.params;
        const category = await categoryService.findOne(Number(id));

        return res.status(HttpCode.OK).json(category);
      }
  );
};

module.exports = {
  initCategoryApi,
};
