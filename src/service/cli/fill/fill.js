'use strict';

const {
  writeToFile,
  paintMessage,
  generatePublications,
  getMockedPublicationsData,
} = require(`~/helpers`);
const {
  CliCommandName,
  MocksConfig,
  MessageColor,
  TableName,
} = require(`~/common/enums`);
const {
  generateInsertSql,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateUsersSqlRows,
  generateCommentsSqlRows,
  generateArticlesSqlRows,
  generateArticlesCategoriesRows,
} = require(`./helpers`);
const {FILL_FILE_PATH} = require(`./common`);

const tableNameToSqlRowsGenerator = {
  [TableName.USERS]: generateUsersSqlRows,
  [TableName.CATEGORIES]: generateCategoriesSqlRows,
  [TableName.ARTICLES]: generateArticlesSqlRows,
  [TableName.COMMENTS]: generateCommentsSqlRows,
  [TableName.ARTICLES_CATEGORIES]: generateArticlesCategoriesRows,
};

module.exports = {
  name: CliCommandName.FILL,
  async run(args) {
    const [publicationsCount] = args;
    const count = Number(publicationsCount) || MocksConfig.DEFAULT_COUNT;

    const mockedPublicationsData = await getMockedPublicationsData();
    const generateArgs = {
      count,
      ...mockedPublicationsData,
    };
    const mockedPublications = generatePublications(generateArgs);
    const generatedSqls = Object.entries(tableNameToSqlRowsGenerator).map(
        ([tableName, generator]) => {
          return generateInsertSql(
              tableName,
              generator(generateArgs, mockedPublications),
          );
        },
    );
    const sql = joinSqlCommands(...generatedSqls);

    try {
      await writeToFile(FILL_FILE_PATH, sql);

      console.info(
          paintMessage(
              `Operation success. File with fill-data was created.`,
              MessageColor.GREEN
          )
      );
    } catch (err) {
      console.error(
          paintMessage(
              `An error occurred on saving fill-db: can't write fill-db to file...`,
              MessageColor.RED
          )
      );
    }
  },
};
