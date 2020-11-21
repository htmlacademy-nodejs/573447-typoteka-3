'use strict';

require(`module-alias/register`);
const {CliExitCode} = require(`~/common/enums`);
const {USER_ARGV_IDX} = require(`~/common/constants`);
const {cli} = require(`./cli`);

const {version, help} = cli;

const userArguments = process.argv.slice(USER_ARGV_IDX);
const [userCommand] = userArguments;

switch (userCommand) {
  case version.name: {
    version.run();

    break;
  }
  case help.name: {
    help.run();

    break;
  }
  default: {
    cli.help.run();

    process.exit(CliExitCode.SUCCESS);
  }
}
