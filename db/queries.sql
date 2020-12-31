/* All categories */
SELECT * FROM categories;

/* Categories with at least one article  */
SELECT * FROM categories WHERE id IN
(
  SELECT category_id FROM articles_categories
);
