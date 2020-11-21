'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);

const cli = {
  version,
  help,
};

module.exports = {
  cli,
};
