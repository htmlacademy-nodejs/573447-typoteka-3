'use strict';

const express = require(`express`);
const apiRouter = require(`~/service/api/api`);
const {getLogger} = require(`~/helpers`);
const {CliCommandName, HttpCode, LoggerName} = require(`~/common/enums`);
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
    logger.info(`Response status code ${res.statusCode}`);
  });

  return next();
});
app.use(API_PREFIX, apiRouter);
app.use((req, res) => {
  logger.error(`Route not found: ${req.url}`);

  return res.status(HttpCode.NOT_FOUND).send(`Not found`);
});

module.exports = {
  name: CliCommandName.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const server = app.listen(port, () => {
      return logger.info(`Listening to connections on ${port}`);
    });

    server.once(`error`, (err) => {
      return logger.error(
          `An error occured on server creation: ${err.message}`,
      );
    });
  },
};
