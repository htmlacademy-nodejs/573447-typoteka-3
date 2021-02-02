'use strict';

const {Router} = require(`express`);
const {validateParamSchema, validateSchema} = require(`~/middlewares`);
const {routeId: routeIdSchema, category: categorySchema} = require(`~/schemas`);
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

  categoryRouter.post(
      CategoryApiPath.ROOT,
      validateSchema(categorySchema),
      async (req, res) => {
        const category = await categoryService.create(req.body);

        return res.status(HttpCode.CREATED).json(category);
      }
  );

  categoryRouter.get(
      CategoryApiPath.$ID,
      validateParamSchema(routeIdSchema, RequestParam.ID),
      async (req, res) => {
        const {id} = req.params;
        const category = await categoryService.findOne(Number(id));

        return res.status(HttpCode.OK).json(category);
      }
  );

  categoryRouter.put(
      CategoryApiPath.$ID,
      [
        validateParamSchema(routeIdSchema, RequestParam.ID),
        validateSchema(categorySchema),
      ],
      async (req, res) => {
        const {body, params} = req;
        const parsedId = Number(params.id);
        const category = await categoryService.findOne(parsedId);

        if (!category) {
          return res
            .status(HttpCode.NOT_FOUND)
            .send(`Not found with ${parsedId}`);
        }

        const isCategoryUpdated = await categoryService.update(parsedId, body);

        return res.status(HttpCode.OK).json(isCategoryUpdated);
      }
  );

  categoryRouter.delete(
      CategoryApiPath.$ID,
      validateParamSchema(routeIdSchema, RequestParam.ID),
      async (req, res) => {
        const {params} = req;
        const isCategoryDelete = await categoryService.drop(Number(params.id));

        if (!isCategoryDelete) {
          return res.status(HttpCode.NOT_FOUND).send(`Not found`);
        }

        return res.status(HttpCode.OK).json(isCategoryDelete);
      }
  );
};

module.exports = {
  initCategoryApi,
};
