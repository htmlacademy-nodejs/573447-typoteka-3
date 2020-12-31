/* All categories */
SELECT * FROM categories;

/* Categories with at least one article  */
SELECT * FROM categories WHERE id IN
(
  SELECT category_id FROM articles_categories
);

/* Categories with articles count */
SELECT
  categories.name,
  articles_categories.category_id,
  count(articles_categories.article_id) AS "articles_count"
FROM
  articles_categories
  INNER JOIN categories
    ON articles_categories.category_id = categories.id
GROUP BY
  articles_categories.category_id,
  categories.name;

/* All articles */
SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.created_date,
  concat(users.first_name, ' ', users.last_name) AS "user_full_name",
  users.email,
  count(comments.article_id) AS "comments_count",
  (
 		SELECT
 			string_agg(categories.name, ', ') AS "categories"
 		FROM articles_categories
 		LEFT JOIN categories
 			ON articles_categories.category_id = categories.id
			AND articles_categories.article_id = articles.id
	)
FROM
  articles
  INNER JOIN users
    ON articles.user_id = users.id
  INNER JOIN comments
    ON articles.id = comments.article_id
GROUP BY
  articles.id,
  users.first_name,
  users.last_name,
  users.email;

/* Full article by id */
SELECT
  articles.id,
  articles.title,
  articles.announce,
  articles.created_date,
  concat(users.first_name, ' ', users.last_name) AS "user_full_name",
  users.email,
  count(comments.article_id) AS "comments_count",
  (
 		SELECT
 			string_agg(categories.name, ', ') AS "categories"
 		FROM articles_categories
 		LEFT JOIN categories
 			ON articles_categories.category_id = categories.id
			AND articles_categories.article_id = articles.id
	)
FROM
  articles
  INNER JOIN users
    ON articles.user_id = users.id
  INNER JOIN comments
    ON articles.id = comments.article_id
WHERE
  articles.id = 1
GROUP BY
  articles.id,
  users.first_name,
  users.last_name,
  users.email;

/* Last 5 comments */
SELECT
	comments.id,
	comments.article_id,
	concat(users.first_name, ' ', users.last_name) AS "user_full_name",
  comments.text
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
ORDER by comments.id DESC
LIMIT 5;

/* Comments by article id */
SELECT
	comments.id,
	comments.article_id,
	comments.text,
	concat(users.first_name, ' ', users.last_name) AS "user_full_name"
FROM comments
INNER JOIN users
	ON comments.user_id = users.id
WHERE comments.article_id = 1
ORDER by comments.id DESC;

/* Update articles */
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE articles.id = 2;
