'use strict';

const {ModelAlias, CommentKey, ArticleCategoryKey} = require(`~/common/enums`);
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

  User.hasMany(Comment, {
    foreignKey: CommentKey.USER_ID,
  });

  Comment.belongsTo(User, {
    foreignKey: CommentKey.USER_ID,
    as: ModelAlias.USER,
  });

  Article.hasMany(Comment, {
    foreignKey: CommentKey.ARTICLE_ID,
    as: ModelAlias.COMMENTS,
  });

  Comment.belongsTo(Article, {
    foreignKey: CommentKey.ARTICLE_ID,
  });

  Article.hasMany(ArticleCategory, {
    as: ModelAlias.ARTICLE_CATEGORIES,
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
  });

  Article.belongsToMany(Category, {
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
    as: ModelAlias.CATEGORIES,
  });

  Category.belongsToMany(Article, {
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
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
