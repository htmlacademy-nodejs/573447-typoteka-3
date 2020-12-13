'use strict';

const express = require(`express`);
const apiRouter = require(`~/service/api/api`);
const {paintMessage} = require(`~/helpers`);
const {CliCommandName, HttpCode, MessageColor} = require(`~/common/enums`);
const {API_PREFIX} = require(`~/common/constants`);
const {DEFAULT_PORT} = require(`./common`);

const app = express();

app.use(express.json());
app.use(API_PREFIX, apiRouter);

app.use((_, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: CliCommandName.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    const server = app.listen(port, () => {
      console.info(paintMessage(`Ожидаю соединений на ${port}`, MessageColor.GREEN));
    });

    server.once(`error`, (err) => {
      console.error(`Ошибка при создании сервера`, err);
    });
  },
};
