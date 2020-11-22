'use strict';

const {paintMessage} = require(`~/helpers`);
const {CliCommandName, MessageColor} = require(`~/common/enums`);
const packageJsonFile = require(`~/../package.json`);

const checkAppVersion = () => {
  const {version} = packageJsonFile;

  console.info(paintMessage(version, MessageColor.BLUE));
};

module.exports = {
  name: CliCommandName.VERSION,
  run: checkAppVersion,
};
