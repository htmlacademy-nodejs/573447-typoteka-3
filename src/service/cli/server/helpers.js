'use strict';

const {readFile} = require(`~/helpers`);
const {MOCKS_FILE_PATH} = require(`./common`);

const getMocks = async () => {
  const fileContent = await readFile(MOCKS_FILE_PATH);

  const mocks = JSON.parse(fileContent);

  return mocks;
};

const getPublicationsListMarkup = (publications) => {
  const publicationsListMarkup = `
  <ul>${publications.reduce((publicationTemplate, publication) =>
    publicationTemplate.concat(`
    <li>${publication.title}</li>
    `), ``)}
  </ul>`;

  return publicationsListMarkup;
};

const sendResponse = (res, statusCode, markup) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${markup}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

module.exports = {
  getMocks,
  getPublicationsListMarkup,
  sendResponse,
};
