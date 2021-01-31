'use strict';

const sequelize = require(`~/db/db`);
const {initDb} = require(`~/db/init-db`);
const {
  paintMessage,
  generatePublications,
  generateMockedUsers,
  getMockedPublicationsData,
  logger
} = require(`~/helpers`);
const {
  CliCommandName,
  CliExitCode,
  MessageColor,
  MocksConfig,
} = require(`~/common/enums`);

module.exports = {
  name: CliCommandName.FILLDB,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);

      await sequelize.authenticate();

      logger.info(`Connection to database established`);
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);

      throw err;
    }

    const [count] = args;
    const publicationsCount = Number(count) || MocksConfig.DEFAULT_COUNT;
    if (publicationsCount > MocksConfig.MAX_COUNT) {
      console.error(
          paintMessage(
              `An error occurred on creating mocked data: No more than 1000 publications.`,
              MessageColor.RED
          )
      );
      process.exit(CliExitCode.ERROR);
    }

    const {
      titles,
      descriptions,
      categories,
      comments,
      users
    } = await getMockedPublicationsData();
    const mockedUsers = await generateMockedUsers(users);
    const mockedPublications = generatePublications({
      count: publicationsCount,
      titles,
      descriptions,
      categories,
      comments,
      users,
    });

    initDb(sequelize, {
      articles: mockedPublications,
      users: mockedUsers,
      categories,
    });
  },
};
