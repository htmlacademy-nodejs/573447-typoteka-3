'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {Search} = require(`~/service/data`);
const {ApiPath, HttpCode} = require(`~/common/enums`);
const {initSearchApi} = require(`./search`);
const {mockedArticles} = require(`./search.mocks`);

const createAPI = () => {
  const app = express();

  app.use(express.json());

  initSearchApi(app, {
    searchService: new Search({
      articles: mockedArticles.slice(),
    }),
  });

  return app;
};

describe(`API returns articles based on search query`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = createAPI();
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
  const app = createAPI();

  await request(app)
    .get(ApiPath.SEARCH)
    .query({
      query: `Как продать душу`,
    })
    .expect(HttpCode.OK);
});

test(`API returns 200 when query string is absent`, async () => {
  const app = createAPI();

  await request(app).get(ApiPath.SEARCH).expect(HttpCode.OK);
});
