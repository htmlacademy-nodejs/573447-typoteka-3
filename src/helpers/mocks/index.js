'use strict';

const {generateMockedComment} = require(`./generate-mocked-comment.helper`);
const {generateMockedComments} = require(`./generate-mocked-comments.helper`);
const {generatePublication} = require(`./generate-publication.helper`);
const {generatePublications} = require(`./generate-publications.helper`);
const {getPublicationsData} = require(`./get-mocked-publications-data.helper`);
const {
  readPublicationsFileContent,
} = require(`./read-publications-file-content.helper`);

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  getPublicationsData,
  readPublicationsFileContent,
};
