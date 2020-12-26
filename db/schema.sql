DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  picture VARCHAR(50) NOT NULL
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE articles
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  created_date DATE NOT NULL,
  announce VARCHAR(150) NOT NULL,
  full_text VARCHAR(1000) NOT NULL,
  image VARCHAR(50) NOT NULL,

  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  text VARCHAR(1000) NOT NULL,
  created_date DATE NOT NULL,

  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
