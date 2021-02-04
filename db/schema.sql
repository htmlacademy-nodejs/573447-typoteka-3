DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles_categories;

CREATE TABLE users
(
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(255) NOT NULL,
  "isAdmin" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE categories
(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE articles
(
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(250) NOT NULL,
  "announce" VARCHAR(250) NOT NULL,
  "createdDate" TIMESTAMP NOT NULL,
  "fullText" VARCHAR(1000),
  "image" VARCHAR(150),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE sessions
(
  "sid" VARCHAR(255) PRIMARY KEY,
  "expires" TIMESTAMP,
  "data" VARCHAR(500),
  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE comments
(
  "id" SERIAL PRIMARY KEY,
  "text" VARCHAR(255) NOT NULL,

  "userId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  "articleId" INTEGER NOT NULL,
  FOREIGN KEY ("articleId") REFERENCES articles (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE articles_categories
(
  "articleId" INTEGER NOT NULL,
  FOREIGN KEY ("articleId") REFERENCES articles (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  "categoryId" INTEGER NOT NULL,
  FOREIGN KEY ("categoryId") REFERENCES categories (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

  "createdAt" TIMESTAMP DEFAULT current_timestamp,
  "updatedAt" TIMESTAMP DEFAULT current_timestamp,

  CONSTRAINT articles_categories_pk PRIMARY KEY ("articleId", "categoryId")
);
