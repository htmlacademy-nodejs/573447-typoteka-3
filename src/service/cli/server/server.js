'use strict';

const express = require(`express`);
const apiRouter = require(`~/service/api/api`);
const sequelize = require(`~/db/db`);
const {getLogger, paintMessage} = require(`~/helpers`);
const {CliCommandName, HttpCode, LoggerName, MessageColor} = require(`~/common/enums`);
const {API_PREFIX} = require(`~/common/constants`);
const {DEFAULT_PORT} = require(`./common`);

const app = express();
const logger = getLogger({
  name: LoggerName.API,
});


app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);

  res.on(`finish`, () => {
    logger.info(
        paintMessage(`Response status code ${res.statusCode}`, MessageColor.GRAY)
    );
  });

  return next();
});
app.use(API_PREFIX, apiRouter);
app.use((req, res) => {
  logger.error(paintMessage(`Route not found: ${req.url}`, MessageColor.RED));

  return res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

app.use((err, _req, _res, _next) => {
  logger.error(
      paintMessage(
          `An error occurred on processing request: ${err.message}`,
          MessageColor.RED
      )
  );
});

module.exports = {
  name: CliCommandName.SERVER,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);

      await sequelize.authenticate();

      logger.info(`Connection to database established`);
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);

      throw err;
    }

    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const server = app.listen(port, () => {
      return logger.info(
          paintMessage(`Listening to connections on ${port}`, MessageColor.BLUE)
      );
    });

    server.once(`error`, (err) => {
      return logger.error(paintMessage(
          `An error occurred on server creation: ${err.message}`,
          MessageColor.RED
      ));
    });
  },
};
