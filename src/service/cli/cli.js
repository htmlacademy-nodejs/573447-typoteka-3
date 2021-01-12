'use strict';

const version = require(`./version/version`);
const help = require(`./help/help`);
const filldb = require(`./filldb/filldb`);
const server = require(`./server/server`);
const fill = require(`./fill/fill`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [filldb.name]: filldb,
  [server.name]: server,
  [fill.name]: fill,
};

module.exports = {
  Cli,
};
