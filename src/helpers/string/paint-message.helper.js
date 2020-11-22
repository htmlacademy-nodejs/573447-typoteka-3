'use strict';

const chalk = require(`chalk`);

const paintMessage = (message, color) => {
  const paintedMessage = chalk[color](message);

  return paintedMessage;
};

module.exports = {
  paintMessage,
};
