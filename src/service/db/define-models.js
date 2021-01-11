'use strict';

const {ModelAlias} = require(`~/common/enums`);
const {
  defineArticleCategoryModel,
  defineArticleModel,
  defineCategoryModel,
  defineCommentModel,
} = require(`./models`);

const defineModels = (sequelize) => {
  const Category = defineCategoryModel(sequelize);
  const Comment = defineCommentModel(sequelize);
  const Article = defineArticleModel(sequelize);
  const ArticleCategory = defineArticleCategoryModel(sequelize);

  Article.hasMany(Comment, {
    foreignKey: `articleId`,
    as: ModelAlias.COMMENTS,
  });

  Comment.belongsTo(Article, {
    foreignKey: `articleId`,
  });

  Article.belongsToMany(Category, {
    through: ArticleCategory,
    as: ModelAlias.CATEGORIES,
  });

  Category.belongsToMany(Article, {
    through: ArticleCategory,
    as: ModelAlias.ARTICLES,
  });

  Category.hasMany(ArticleCategory, {
    as: ModelAlias.ARTICLES_CATEGORIES,
  });

  return {
    Category,
    Comment,
    Article,
    ArticleCategory,
  };
};

module.exports = {
  defineModels,
};
