'use strict';

const {defineModels} = require(`~/db/define-models`);

const initDb = async (sequelize, mockedPayload) => {
  const {
    categories,
    articles,
    users,
    comments,
    articlesCategories,
  } = mockedPayload;
  const {Category, Article, User, Comment, ArticleCategory} = defineModels(
      sequelize
  );

  await sequelize.sync({
    force: true,
  });

  await Category.bulkCreate(categories);
  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);
  await ArticleCategory.bulkCreate(articlesCategories);
};

module.exports = {
  initDb,
};
