'use strict';

const express = require(`express`);
const {Sequelize} = require(`sequelize`);
const request = require(`supertest`);
const {Search} = require(`~/service/data`);
const {initDb} = require(`~/db/init-db`);
const {ApiPath, HttpCode} = require(`~/common/enums`);
const {initSearchApi} = require(`./search`);
const {mockedArticles} = require(`./search.mocks`);

const createAPI = async () => {
  const app = express();
  const mockedDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });

  app.use(express.json());

  await initDb(mockedDB, {
    categories: [],
    articles: mockedArticles,
    users: [],
    comments: [],
    articlesCategories: [],
  });

  initSearchApi(app, {
    searchService: new Search({
      articleModel: mockedDB.models.Article,
      categoryModel: mockedDB.models.Category,
    }),
  });

  return app;
};

describe(`API returns articles based on search query`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(ApiPath.SEARCH).query({
      query: `Как начать`,
    });
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`1 article found`, () => {
    expect(response.body.length).toBe(1);
  });
});

test(`API returns code 200 if nothing is found`, async () => {
  const app = await createAPI();

  await request(app)
    .get(ApiPath.SEARCH)
    .query({
      query: `Как продать душу`,
    })
    .expect(HttpCode.OK);
});

test(`API returns 200 when query string is absent`, async () => {
  const app = await createAPI();

  await request(app).get(ApiPath.SEARCH).expect(HttpCode.OK);
});
