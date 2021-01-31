'use strict';

const {
  generateMockedComment,
} = require(`~/helpers/mocks/generate-mocked-comment.helper`);

const generateMockedComments = ({count, comments, users}) => {
  const mockedComments = Array.from(new Array(count), () =>
    generateMockedComment({comments, users})
  );

  return mockedComments;
};

module.exports = {
  generateMockedComments,
};
