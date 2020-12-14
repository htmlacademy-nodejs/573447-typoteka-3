'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {Articles, Comments} = require(`~/service/data`);
const {ApiPath, HttpCode, ArticleKey} = require(`~/common/enums`);
const {initArticlesApi} = require(`./articles`);
const {mockedArticles} = require(`./articles.mocks`);

const createAPI = () => {
  const app = express();

  app.use(express.json());

  initArticlesApi(app, {
    articlesService: new Articles({
      articles: mockedArticles.slice(),
    }),
    commentsService: new Comments(),
  });

  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response = null;

  beforeAll(async () => {
    response = await request(app).get(ApiPath.ARTICLES);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => {
    expect(response.body.length).toBe(5);
  });
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response = null;

  beforeAll(async () => {
    response = await request(app).get(`${ApiPath.ARTICLES}/nr89tp`);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Article's title is "Самый лучший музыкальный альбом этого года"`, () => {
    expect(response.body.title).toBe(`Самый лучший музыкальный альбом этого года`);
  });
});

describe(`API creates an article if data is valid`, () => {
  const app = createAPI();
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовк`,
    [ArticleKey.ANNOUNCE]: `Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CATEGORY]: [`Кино`],
  };

  let response = null;

  beforeAll(async () => {
    response = await request(app).post(ApiPath.ARTICLES).send(newArticle);
  });

  test(`Status code 201`, () => {
    expect(response.status).toBe(HttpCode.CREATED);
  });

  test(`Returns article created`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });

  test(`Articles count is changed`, () => {
    request(app)
      .get(ApiPath.ARTICLES)
      .expect((res) => expect(res.body.length).toBe(6));
  });
});

describe(`API refuses to create an article if data is invalid`, () => {
  const app = createAPI();
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовк`,
    [ArticleKey.ANNOUNCE]: `Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CATEGORY]: [`Кино`],
  };

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
  const app = createAPI();
  const newArticle = {
    [ArticleKey.TITLE]: `Новый заголовк`,
    [ArticleKey.ANNOUNCE]: `Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CATEGORY]: [`Кино`],
  };

  let response = null;

  beforeAll(async () => {
    response = await request(app)
      .put(`${ApiPath.ARTICLES}/nr89tp`)
      .send(newArticle);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Returns changed article`, () => {
    expect(response.body).toEqual(expect.objectContaining(newArticle));
  });

  test(`Article is really changed`, () => {
    request(app)
      .get(`${ApiPath.ARTICLES}/nr89tp`)
      .expect((res) => expect(res.body.title).toBe(`Новый заголовк`));
  });
});

test(`API returns status code 404 when trying to change non-existent article`, async () => {
  const app = createAPI();

  const validArticle = {
    [ArticleKey.ID]: `id`,
    [ArticleKey.TITLE]: `Новый заголовк`,
    [ArticleKey.ANNOUNCE]: `Новый анонс`,
    [ArticleKey.FULL_TEXT]: `Новый текст`,
    [ArticleKey.CATEGORY]: [`Кино`],
    [ArticleKey.CREATED_DATE]: `2020-10-04T22:47:25.902Z`,
    [ArticleKey.COMMENTS]: [],
  };
  await request(app)
    .put(`${ApiPath.ARTICLES}/no_exst`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, async () => {
  const app = createAPI();

  await request(app)
    .put(`${ApiPath.ARTICLES}/no_exst`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response = null;

  beforeAll(async () => {
    response = await request(app).delete(`${ApiPath.ARTICLES}/5wXLUD`);
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Article count is 4 now`, () => {
    request(app)
      .get(ApiPath.ARTICLES)
      .expect((res) => expect(res.body.length).toBe(4));
  });
});

test(`API refuses to delete non-existent article`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();

  let response = null;

  beforeAll(async () => {
    response = await request(app).get(`${ApiPath.ARTICLES}/mtCOcY/comments`);
  });

  test(`Status code 200`, () => expect(response.status).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => {
    expect(response.body.length).toBe(1);
  });
});

describe(`API creates a comment if data is valid`, () => {
  const app = createAPI();
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  let response = null;

  beforeAll(async () => {
    response = await request(app)
      .post(`${ApiPath.ARTICLES}/8Ljh8l/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => {
    expect(response.status).toBe(HttpCode.CREATED);
  });

  test(`Returns comment created`, () => {
    expect(response.body).toEqual(expect.objectContaining(newComment));
  });

  test(`Comments count is changed`, () => {
    request(app)
      .get(`${ApiPath.ARTICLES}/GxdTgz/comments`)
      .expect((res) => expect(res.body.length).toBe(5));
  });
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  const app = createAPI();
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };

  await request(app)
    .post(`${ApiPath.ARTICLES}/NOEXST/comments`)
    .send(newComment)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const app = createAPI();

  await request(app)
    .post(`${ApiPath.ARTICLES}/nr89tp/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response = null;

  beforeAll(async () => {
    response = await request(app).delete(
        `${ApiPath.ARTICLES}/nr89tp/comments/Ehn7qH`
    );
  });

  test(`Status code 200`, () => {
    expect(response.status).toBe(HttpCode.OK);
  });

  test(`Comments count is 2 now`, () => {
    request(app)
      .get(`${ApiPath.ARTICLES}/nr89tp/comments`)
      .expect((res) => expect(res.body.length).toBe(2));
  });
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, async () => {
  const app = createAPI();

  await request(app)
    .delete(`${ApiPath.ARTICLES}/NOEXST/comments/kqME9j`)
    .expect(HttpCode.NOT_FOUND);
});
