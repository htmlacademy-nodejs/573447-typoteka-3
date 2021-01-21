'use strict';

const {joinMessages} = require(`./helpers`);

class HttpError extends Error {
  constructor({status, messages}) {
    super(joinMessages(messages));
    this.status = status;
    this.messages = messages;
  }
}

module.exports = HttpError;
