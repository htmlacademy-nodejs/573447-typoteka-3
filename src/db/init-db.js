'use strict';

const {defineModels} = require(`~/db/define-models`);
const {ModelAlias} = require(`~/common/enums`);

const initDb = async (sequelize, {categories, articles}) => {
  const {Category, Article} = defineModels(sequelize);

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
