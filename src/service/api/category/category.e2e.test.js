'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {Category} = require(`~/service/data`);
const {ApiPath, HttpCode} = require(`~/common/enums`);
const {initCategoryApi} = require(`./category`);
const {mockedArticles} = require(`./category.mocks`);

const app = express();

app.use(express.json());

initCategoryApi(app, {
  categoryService: new Category({
    articles: mockedArticles,
  }),
});

describe(`API returns category list`, () => {
  let response = null;

  beforeAll(async () => {
    response = await request(app).get(ApiPath.CATEGORIES);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Returns list of 3 categories`, () => {
    expect(response.body.length).toBe(3);
  });

  test(`Category names are "Разное", "Без рамки", "IT"`, () => {
    expect(response.body).toEqual([`Разное`, `Без рамки`, `IT`]);
  });
});
