'use strict';

const express = require(`express`);
const {paintMessage} = require(`~/helpers`);
const {CliCommandName, HttpCode, MessageColor} = require(`~/common/enums`);
const {getMocks} = require(`./helpers`);
const {ApiPath, DEFAULT_PORT} = require(`./common`);

const app = express();

app.use(express.json());

app.get(ApiPath.POSTS, async (_, res) => {
  try {
    const mocks = (await getMocks()) || [];

    res.status(HttpCode.OK).json(mocks);
  } catch (err) {
    res.status(HttpCode.OK).json([]);
  }
});

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
