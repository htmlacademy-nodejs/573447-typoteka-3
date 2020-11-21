'use strict';

require(`module-alias/register`);
const {USER_ARGV_IDX} = require(`~/common/constants`);
const {cli} = require(`./cli`);

const {version} = cli;

const userArguments = process.argv.slice(USER_ARGV_IDX);
const [userCommand] = userArguments;

switch (userCommand) {
  case version.name: {
    version.run();

    break;
  }
}
