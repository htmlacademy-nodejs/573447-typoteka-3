'use strict';

const express = require(`express`);
const {Sequelize} = require(`sequelize`);
const request = require(`supertest`);
const {Users} = require(`~/service/data`);
const {initDb} = require(`~/service/db/init-db`);
const {ApiPath, HttpCode, CreatedUserPayloadKey} = require(`~/common/enums`);
const {initUsersApi} = require(`./users`);

const createAPI = async () => {
  const app = express();
  const mockedDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });

  app.use(express.json());

  await initDb(mockedDB, {
    categories: [],
    articles: [],
  });

  initUsersApi(app, {
    usersService: new Users({
      userModel: mockedDB.models.User,
    }),
  });

  return app;
};

describe(`Api create a user if data is valid`, () => {
  const newUser = {
    [CreatedUserPayloadKey.EMAIL]: `test@mail.com`,
    [CreatedUserPayloadKey.PASSWORD]: `password`,
    [CreatedUserPayloadKey.REPEATED_PASSWORD]: `password`,
    [CreatedUserPayloadKey.FIRST_NAME]: `firstName`,
    [CreatedUserPayloadKey.LAST_NAME]: `lastName`,
    [CreatedUserPayloadKey.AVATAR]: `avatar.jpg`,
  };

  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.USERS).send(newUser);
  });

  test(`Status code 201`, () => {
    expect(response.status).toBe(HttpCode.CREATED);
  });

  test(`Status code 400 when try to register user with the same email`, async () => {
    await request(app)
      .post(ApiPath.USERS)
      .send(newUser)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API refuses to create a user if data is invalid`, () => {
  const invalidUser = {
    [CreatedUserPayloadKey.EMAIL]: `invalid.com`,
    [CreatedUserPayloadKey.FIRST_NAME]: `firstName`,
    [CreatedUserPayloadKey.LAST_NAME]: `lastName`,
  };

  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.USERS).send(invalidUser);
  });

  test(`Status code 400`, () => {
    expect(response.status).toBe(HttpCode.BAD_REQUEST);
  });
});
