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

const generateCategoriesSqlRows = ({categories}) => {
  return categories.map((category) => generateInsertSqlRow(`'${category}'`));
};

module.exports = {
  generateInsertSql,
  generateInsertSqlRow,
  joinSqlCommands,
  generateCategoriesSqlRows,
};
