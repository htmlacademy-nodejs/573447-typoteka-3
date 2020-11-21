'use strict';

const {CliCommandName} = require(`~/common/enums`);
const packageJsonFile = require(`../../../package.json`);

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  console.info(version);
};

module.exports = {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
