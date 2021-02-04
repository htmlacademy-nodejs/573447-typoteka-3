'use strict';

const {generateMockedComment} = require(`./generate-mocked-comment.helper`);
const {generateMockedComments} = require(`./generate-mocked-comments.helper`);
const {generatePublication} = require(`./generate-publication.helper`);
const {generatePublications} = require(`./generate-publications.helper`);
const {generateMockedUser} = require(`./generate-mocked-user.helper`);
const {generateMockedUsers} = require(`./generate-mocked-users.helper`);
const {generateMockedCategory} = require(`./generate-mocked-category.helper`);
const {
  generateMockedCategories,
} = require(`./generate-mocked-categories.helper`);
const {
  generateMockedArticleCategory,
} = require(`./generate-mocked-article-category.helper`);
const {
  generateMockedArticlesCategories,
} = require(`./generate-mocked-articles-categories.helper`);
const {getMockedData} = require(`./get-mocked-data.helper`);
const {
  readPublicationsFileContent,
} = require(`./read-publications-file-content.helper`);
const {generateMocks} = require(`./generate-mocks.helper`);

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  generateMockedUser,
  generateMockedUsers,
  generateMockedCategory,
  generateMockedCategories,
  generateMockedArticleCategory,
  generateMockedArticlesCategories,
  getMockedData,
  readPublicationsFileContent,
  generateMocks,
};
