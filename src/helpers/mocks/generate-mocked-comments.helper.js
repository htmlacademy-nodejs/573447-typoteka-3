'use strict';

const {
  generateMockedComment,
} = require(`~/helpers/mocks/generate-mocked-comment.helper`);

const generateMockedComments = ({count, comments}) => {
  const mockedComments = Array.from(new Array(count), () =>
    generateMockedComment({comments})
  );

  return mockedComments;
};

module.exports = {
  generateMockedComments,
};
