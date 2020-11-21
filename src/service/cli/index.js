'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);
const generate = require(`./generate/generate`);

const cli = {
  version,
  help,
  generate,
};

module.exports = {
  cli,
};
