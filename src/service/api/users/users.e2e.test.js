'use strict';

const express = require(`express`);
const {Sequelize} = require(`sequelize`);
const request = require(`supertest`);
const {Users} = require(`~/service/data`);
const {initDb} = require(`~/db/init-db`);
const {
  ApiPath,
  HttpCode,
  CreatedUserPayloadKey,
  UserKey,
  UsersApiPath,
} = require(`~/common/enums`);
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

describe(`Api works correct when user try to login`, () => {
  const newUser = {
    email: `test@mail.com`,
    password: `password`,
    repeatedPassword: `password`,
    firstName: `firstName`,
    lastName: `lastName`,
    avatar: `avatar.jpg`,
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

  test(`Allows to login if the user-payload is correct`, async () => {
    const userLoginPayload = {
      email: newUser.email,
      password: newUser.password,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.OK);
    expect(userResponse.body).toHaveProperty(
        UserKey.EMAIL,
        userLoginPayload.email
    );
  });

  test(`Refuses to login if email is wrong`, async () => {
    const userLoginPayload = {
      email: `wrong@mail.com`,
      password: newUser.password,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.UNAUTHORIZE);
  });

  test(`Refuses to login if password is wrong`, async () => {
    const userLoginPayload = {
      email: newUser.email,
      password: `wrong-password`,
    };

    const userResponse = await request(app)
      .post(`${ApiPath.USERS}/${UsersApiPath.LOGIN}`)
      .send(userLoginPayload);

    expect(userResponse.status).toBe(HttpCode.UNAUTHORIZE);
  });
});
