'use strict';

require(`module-alias/register`);
const {CliCommandName} = require(`~/common/enums`);
const {USER_ARGV_IDX, COMMAND_ARGS_IDX} = require(`~/common/constants`);
const {Cli} = require(`./cli/cli`);

const userArguments = process.argv.slice(USER_ARGV_IDX);
const [userCommand] = userArguments;
const commandArguments = userArguments.slice(COMMAND_ARGS_IDX);

if (!userArguments.length || !Cli[userCommand]) {
  Cli[CliCommandName.HELP].run(commandArguments);
} else {
  Cli[userCommand].run(commandArguments);
}
