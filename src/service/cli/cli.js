'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);
const generate = require(`./generate/generate`);
const server = require(`./server/server`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [server.name]: server,
};

module.exports = {
  Cli,
};
