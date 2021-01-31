'use strict';

const {generateMockedComment} = require(`./generate-mocked-comment.helper`);
const {generateMockedComments} = require(`./generate-mocked-comments.helper`);
const {generatePublication} = require(`./generate-publication.helper`);
const {generatePublications} = require(`./generate-publications.helper`);
const {generateMockedUser} = require(`./generate-mocked-user.helper`);
const {generateMockedUsers} = require(`./generate-mocked-users.helper`);
const {getMockedPublicationsData} = require(`./get-mocked-publications-data.helper`);
const {
  readPublicationsFileContent,
} = require(`./read-publications-file-content.helper`);

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  generateMockedUser,
  generateMockedUsers,
  getMockedPublicationsData,
  readPublicationsFileContent,
};
