'use strict';

const express = require(`express`);
const {Sequelize} = require(`sequelize`);
const request = require(`supertest`);
const {Articles, Comments} = require(`~/service/data`);
const {initDb} = require(`~/db/init-db`);
const {ApiPath, HttpCode, ArticleKey} = require(`~/common/enums`);
const {initArticlesApi} = require(`./articles`);
const {mockedArticles, mockedCategories} = require(`./articles.mocks`);

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

  initArticlesApi(app, {
    articlesService: new Articles({
      articleModel: mockedDB.models.Article,
    }),
    commentsService: new Comments({
      commentModel: mockedDB.models.Comment
    }),
  });

  return app;
};

describe(`API returns a list of all articles`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(ApiPath.ARTICLES);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => {
    expect(response.body.length).toBe(5);
  });
});

describe(`API returns an article with given id`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`${ApiPath.ARTICLES}/1`);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Article's title is "Самый лучший музыкальный альбом этого года"`, () => {
    expect(response.body.title).toBe(`Самый лучший музыкальный альбом этого года`);
  });
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовoк, Новый заголовoк, Новый заголовoк`,
    [ArticleKey.IMAGE]: null,
    [ArticleKey.ANNOUNCE]: `Новый анонс, Новый анонс, Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CREATED_DATE]: `2020-10-04T22:47:25.902Z`,
    [ArticleKey.CATEGORIES]: [1],
  };
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(ApiPath.ARTICLES).send(newArticle);
  });

  test(`Status code 201`, () => {
    expect(response.status).toBe(HttpCode.CREATED);
  });

  test(`Articles count is changed`, async () => {
    await request(app)
      .get(ApiPath.ARTICLES)
      .expect((res) => expect(res.body.length).toBe(6));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовок`,
    [ArticleKey.IMAGE]: null,
    [ArticleKey.ANNOUNCE]: `Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CREATED_DATE]: `2020-10-04T22:47:25.902Z`,
    [ArticleKey.CATEGORIES]: [1],
  };
  let app = null;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    const badArticle = {...newArticle};

    delete badArticle.title;

    await request(app)
      .post(ApiPath.ARTICLES)
      .send(badArticle)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовок, Новый заголовок`,
    [ArticleKey.IMAGE]: null,
    [ArticleKey.ANNOUNCE]: `Новый анонс, Новый анонс, Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CREATED_DATE]: `2020-10-04T22:47:25.902Z`,
    [ArticleKey.CATEGORIES]: [1]
  };
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`${ApiPath.ARTICLES}/2`)
      .send(newArticle);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Article is really changed`, async () => {
    await request(app)
      .get(`${ApiPath.ARTICLES}/2`)
      .expect((res) => expect(res.body.title).toBe(`Новый заголовок, Новый заголовок`));
  });
});

test(`API returns status code 404 when trying to change non-existent article`, async () => {
  const app = await createAPI();
  const validArticle = {
    [ArticleKey.TITLE]: `Новый заголовк, Новый заголовк, Новый заголовк, Новый заголовк`,
    [ArticleKey.IMAGE]: null,
    [ArticleKey.ANNOUNCE]: `Новый анонс, Новый анонс, Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CREATED_DATE]: `2020-10-04T22:47:25.902Z`,
    [ArticleKey.CATEGORIES]: [1]
  };

  await request(app)
    .put(`${ApiPath.ARTICLES}/20`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, async () => {
  const app = await createAPI();

  await request(app)
    .put(`${ApiPath.ARTICLES}/20`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`${ApiPath.ARTICLES}/1`);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Article count is 4 now`, async () => {
    await request(app)
      .get(ApiPath.ARTICLES)
      .expect((res) => expect(res.body.length).toBe(4));
  });
});

test(`API refuses to delete non-existent article`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/20`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`${ApiPath.ARTICLES}/4/comments`);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));

  test(`Returns list of 1 comments`, () => {
    expect(response.body.length).toBe(1);
  });
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`${ApiPath.ARTICLES}/2/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => {
    expect(response.status).toBe(HttpCode.CREATED);
  });
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  const app = await createAPI();
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  await request(app)
    .post(`${ApiPath.ARTICLES}/20/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = await createAPI();

  await request(app)
    .post(`${ApiPath.ARTICLES}/2/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  let app = null;
  let response = null;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(
        `${ApiPath.ARTICLES}/1/comments/1`
    );
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Comments count is 3 now`, async () => {
    await request(app)
      .get(`${ApiPath.ARTICLES}/1/comments`)
      .expect((res) => expect(res.body.length).toBe(3));
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/1/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, async () => {
  const app = await createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/20/comments/1`)
    .expect(HttpCode.NOT_FOUND);
});
