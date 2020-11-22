'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);
const generate = require(`./generate/generate`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};

module.exports = {
  Cli,
};
