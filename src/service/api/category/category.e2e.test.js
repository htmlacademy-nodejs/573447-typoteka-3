'use strict';

const express = require(`express`);
const {Sequelize} = require(`sequelize`);
const request = require(`supertest`);
const {Category} = require(`~/service/data`);
const {initDb} = require(`~/db/init-db`);
const {ApiPath, HttpCode} = require(`~/common/enums`);
const {initCategoryApi} = require(`./category`);
const {mockedArticles, mockedCategories} = require(`./category.mocks`);

const createAPI = async () => {
  const app = express();
  const mockedDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });

  app.use(express.json());

  await initDb(mockedDB, {
    categories: mockedCategories,
    articles: mockedArticles,
  });

  initCategoryApi(app, {
    categoryService: new Category({
      categoryModel: mockedDB.models.Category,
    }),
  });

  return app;
};

describe(`API returns category list`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(ApiPath.CATEGORIES);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Returns list of 3 categories`, () => {
    expect(response.body.length).toBe(3);
  });

  test(`Category names are "Разное", "Без рамки", "IT"`, () => {
    expect(response.body.map((it) => it.name)).toEqual([
      `Разное`,
      `Без рамки`,
      `IT`,
    ]);
  });
});
