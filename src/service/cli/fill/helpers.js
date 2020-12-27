'use strict';

const {getRandomId, getRandomNumber} = require(`~/helpers`);
const {MocksConfig} = require(`~/common/enums`);

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

const generateUsersSqlRows = ({users}) => {
  return users.map((user) => {
    const [firstName, lastName, email] = user.split(` `);
    const password = getRandomId();
    const image = `avatar-${getRandomNumber(
        MocksConfig.USER_PICTURE.NUMBER.MIN,
        MocksConfig.USER_PICTURE.NUMBER.MAX
    )}.jpg`;

    return generateInsertSqlRow(
        `'${firstName}', '${lastName}', '${email}', '${password}', '${image}'`
    );
  });
};

module.exports = {
  generateInsertSql,
  generateInsertSqlRow,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateUsersSqlRows,
};
