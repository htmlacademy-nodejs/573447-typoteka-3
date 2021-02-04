'use strict';

const {writeToFile, paintMessage, generateMocks} = require(`~/helpers`);
const {CliCommandName, MocksConfig, MessageColor} = require(`~/common/enums`);
const {generateInsertSql, joinSqlCommands} = require(`./helpers`);
const {FILL_FILE_PATH, tableNameToSqlRowsGeneratorMap} = require(`./common`);


const generateMockedSql = (generateMocksArgs) => {
  return Object.entries(tableNameToSqlRowsGeneratorMap).map(
      ([tableName, generator]) => {
        return generateInsertSql(tableName, generator(generateMocksArgs));
      }
  );
};

module.exports = {
  name: CliCommandName.FILL,
  async run(args) {
    const [publicationsCount] = args;
    const count = Number(publicationsCount) || MocksConfig.DEFAULT_COUNT;

    const mocks = await generateMocks({
      articlesCount: count,
    });
    const mockedSql = generateMockedSql(mocks);
    const fullMockedSql = joinSqlCommands(...mockedSql);

    try {
      await writeToFile(FILL_FILE_PATH, fullMockedSql);

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
