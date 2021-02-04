'use strict';

const {
  generateMockedComment,
} = require(`~/helpers/mocks/generate-mocked-comment.helper`);

const generateMockedComments = ({count, comments, users, articleId}) => {
  return Array.from(new Array(count), () => {
    return generateMockedComment({comments, users, articleId});
  });
};

module.exports = {
  generateMockedComments,
};
