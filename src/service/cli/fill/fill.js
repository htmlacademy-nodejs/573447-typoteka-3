'use strict';

const {CliCommandName, MocksConfig} = require(`~/common/enums`);

module.exports = {
  name: CliCommandName.FILL,
  async run(args) {
    const [count] = args;
    const publicationsCount = Number(count) || MocksConfig.DEFAULT_COUNT;

    console.log(publicationsCount);
  },
};
