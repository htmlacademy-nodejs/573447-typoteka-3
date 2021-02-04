'use strict';

const {
  generatePublication,
} = require(`~/helpers/mocks/generate-publication.helper`);

const generatePublications = ({count, titles, descriptions}) => {
  return Array.from(new Array(count), () => {
    return generatePublication({
      titles,
      descriptions,
    });
  });
};

module.exports = {
  generatePublications,
};
