'use strict';

const {logger} = require(`~/helpers`);
const {CliCommandName} = require(`~/common/enums`);
const packageJsonFile = require(`~/../package.json`);

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  logger.info(version);
};

module.exports = {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
