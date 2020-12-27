'use strict';

const {
  generatePublication,
} = require(`~/helpers/mocks/generate-publication.helper`);

const generatePublications = ({
  count,
  titles,
  descriptions,
  categories,
  comments,
}) => {
  const generatedPublications = Array.from(new Array(count), () =>
    generatePublication({
      titles,
      descriptions,
      categories,
      comments,
    })
  );

  return generatedPublications;
};

module.exports = {
  generatePublications,
};
