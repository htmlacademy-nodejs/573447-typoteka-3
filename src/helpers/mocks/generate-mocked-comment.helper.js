'use strict';

const {getRandomNumber} = require(`~/helpers/number`);
const {getRandomItems} = require(`~/helpers/array`);
const {CommentKey, MocksConfig} = require(`~/common/enums`);

const generateMockedComment = ({comments, users}) => ({
  [CommentKey.TEXT]: getRandomItems(
      comments,
      getRandomNumber(
          MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
          MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
      )
  ).join(` `),
  [CommentKey.USER_ID]: getRandomNumber(
      MocksConfig.COMMENTS.MIN_USERS_COUNT,
      users.length
  ),
});

module.exports = {
  generateMockedComment
};
