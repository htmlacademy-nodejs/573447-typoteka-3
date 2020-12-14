'use strict';

const {logger, paintMessage} = require(`~/helpers`);
const {CliCommandName, MessageColor} = require(`~/common/enums`);

const outputHelpInfo = () => {
  const text = `
    Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
  `;

  logger.info(paintMessage(text, MessageColor.GRAY));
};

module.exports = {
  name: CliCommandName.HELP,
  run: outputHelpInfo,
};
