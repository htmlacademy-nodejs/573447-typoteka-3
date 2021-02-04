'use strict';

const generateInsertSql = (tableName, rows) => {
  const comment = `/* ${tableName} */ `;
  const insert = `INSERT INTO ${tableName} VALUES`;
  const sqlRows = `  ${rows.join(`,\n  `)};`;

  return [comment, insert, sqlRows].join(`\n`).trim();
};

const generateInsertSqlRow = (rowPayload) => {
  return `(DEFAULT, ${rowPayload})`;
};

const joinSqlCommands = (...sqlCommands) => {
  return sqlCommands.join(`\n\n`).trim();
};

const generateUsersSqlRows = ({users}) => {
  return users.map((user) => {
    const {email, password, firstName, lastName, avatar, isAdmin} = user;

    return generateInsertSqlRow(
        `'${email}', '${password}', '${firstName}', '${lastName}', '${avatar}', ${isAdmin}`
    );
  });
};

const generateCategoriesSqlRows = ({categories}) => {
  return categories.map((category) => {
    const {name} = category;

    return generateInsertSqlRow(`'${name}'`);
  });
};

const generateArticlesSqlRows = ({articles}) => {
  return articles.map((article) => {
    const {title, createdDate, announce, fullText, image} = article;

    return generateInsertSqlRow(
        `'${title}', '${announce}', '${createdDate}', '${fullText}', '${image}'`
    );
  });
};

const generateCommentsSqlRows = ({comments}) => {
  return comments.map((comment) => {
    const {text, userId, articleId} = comment;

    return generateInsertSqlRow(`'${text}', ${userId}, ${articleId}`);
  });
};

const generateArticlesCategoriesRows = ({articlesCategories}) => {
  return articlesCategories.map((articleCategory) => {
    const {articleId, categoryId} = articleCategory;

    return `(${articleId}, ${categoryId})`;
  });
};

module.exports = {
  generateInsertSql,
  generateInsertSqlRow,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateUsersSqlRows,
  generateCommentsSqlRows,
  generateArticlesSqlRows,
  generateArticlesCategoriesRows,
};
