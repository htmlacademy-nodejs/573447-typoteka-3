'use strict';

const {getRandomId} = require(`~/helpers/string`);
const {getRandomNumber} = require(`~/helpers/number`);
const {getRandomItems} = require(`~/helpers/array`);
const {CommentKey, MocksConfig} = require(`~/common/enums`);

const generateMockedComment = ({comments}) => ({
  [CommentKey.ID]: getRandomId(),
  [CommentKey.TEXT]: getRandomItems(
      comments,
      getRandomNumber(
          MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
          MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
      )
  ).join(` `),
});

module.exports = {
  generateMockedComment
};
