'use strict';

const {CliCommandName} = require(`~/common/enums`);

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

  console.info(text);
};

module.exports = {
  name: CliCommandName.HELP,
  run: outputHelpInfo,
};