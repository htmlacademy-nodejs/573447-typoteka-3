'use strict';

const {defineModels} = require(`~/db/define-models`);
const {ModelAlias} = require(`~/common/enums`);

const initDb = async (sequelize, mockedPayload) => {
  const {categories, articles, users} = mockedPayload;
  const {Category, Article, User} = defineModels(sequelize);

  await sequelize.sync({
    force: true,
  });

  const categoryModels = await Category.bulkCreate(
      categories.map((item) => ({
        name: item,
      }))
  );

  const categoryIdByName = categoryModels.reduce(
      (acc, next) => ({
        ...acc,
        [next.name]: next.id,
      }),
      {}
  );

  for await (const user of users) {
    await User.create(user);
  }

  await Promise.all(
      articles.map(async (article) => {
        const articleModel = await Article.create(article, {
          include: [ModelAlias.COMMENTS],
        });

        await articleModel.addCategories(
            article.categories.map((name) => categoryIdByName[name])
        );
      })
  );
};

module.exports = {
  initDb,
};
