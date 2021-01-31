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
  users,
}) => {
  const generatedPublications = Array.from(new Array(count), () => {
    return generatePublication({
      titles,
      descriptions,
      categories,
      comments,
      users,
    });
  });

  return generatedPublications;
};

module.exports = {
  generatePublications,
};
