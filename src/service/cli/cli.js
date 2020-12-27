'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);
const generate = require(`./generate/generate`);
const server = require(`./server/server`);
const fill = require(`./fill/fill`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [server.name]: server,
  [fill.name]: fill,
};

module.exports = {
  Cli,
};
