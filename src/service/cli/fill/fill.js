'use strict';

const {
  logger,
  writeToFile,
  paintMessage,
  generatePublications,
  getMockedPublicationsData,
} = require(`~/helpers`);
const {CliCommandName, MocksConfig, MessageColor} = require(`~/common/enums`);
const {
  generateInsertSql,
  joinSqlCommands,
  generateCategoriesSqlRows,
  generateUsersSqlRows,
  generateCommentsSqlRows,
  generateArticlesSqlRows
} = require(`./helpers`);
const {FILL_FILE_PATH, TableName} = require(`./common`);

const tableNameToSqlRowsGenerator = {
  [TableName.USERS]: generateUsersSqlRows,
  [TableName.CATEGORIES]: generateCategoriesSqlRows,
  [TableName.COMMENTS]: generateCommentsSqlRows,
  [TableName.ARTICLES]: generateArticlesSqlRows,
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

      logger.info(
          paintMessage(
              `Operation success. File with fill-data was created.`,
              MessageColor.GREEN
          )
      );
    } catch (err) {
      logger.error(
          paintMessage(
              `An error occurred on saving fill-db: can't write fill-db to file...`,
              MessageColor.RED
          )
      );
    }
  },
};
