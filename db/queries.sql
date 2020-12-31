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
