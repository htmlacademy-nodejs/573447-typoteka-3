'use strict';

const {ModelAlias} = require(`~/common/enums`);
const {
  defineArticleCategoryModel,
  defineArticleModel,
  defineCategoryModel,
  defineCommentModel,
  defineUserModel,
  defineSessionModel,
} = require(`./models`);

const defineModels = (sequelize) => {
  const Category = defineCategoryModel(sequelize);
  const Comment = defineCommentModel(sequelize);
  const Article = defineArticleModel(sequelize);
  const ArticleCategory = defineArticleCategoryModel(sequelize);
  const User = defineUserModel(sequelize);
  const Session = defineSessionModel(sequelize);

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
    as: ModelAlias.ARTICLE_CATEGORIES,
  });

  return {
    Category,
    Comment,
    Article,
    ArticleCategory,
    User,
    Session,
  };
};

module.exports = {
  defineModels,
};
