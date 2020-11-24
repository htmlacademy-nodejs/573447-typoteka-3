'use strict';

const http = require(`http`);
const {paintMessage} = require(`~/helpers`);
const {CliCommandName, HttpCode} = require(`~/common/enums`);
const {getMocks, getPublicationsListMarkup, sendResponse} = require(`./helpers`);
const {ServerPath, DEFAULT_PORT} = require(`./common`);

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case ServerPath.ROOT: {
      try {
        const mockedPublications = await getMocks();
        const markup = getPublicationsListMarkup(mockedPublications);
        sendResponse(res, HttpCode.OK, markup);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    }
    default: {
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);

      break;
    }
  }
};

module.exports = {
  name: CliCommandName.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          console.error(paintMessage(`Ошибка при создании сервера, ${err}`, `red`));

          return;
        }

        console.info(paintMessage(`Ожидаю соединений на ${port}`, `green`));
      });
  },
};
