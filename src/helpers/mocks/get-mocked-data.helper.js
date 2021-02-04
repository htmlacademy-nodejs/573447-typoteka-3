'use strict';

const {MocksConfig} = require(`~/common/enums`);
const {
  readPublicationsFileContent,
} = require(`~/helpers/mocks/read-publications-file-content.helper`);

const dataPaths = [
  MocksConfig.TITLE.FILE_PATH,
  MocksConfig.TEXT.FILE_PATH,
  MocksConfig.CATEGORY.FILE_PATH,
  MocksConfig.COMMENTS.FILE_PATH,
  MocksConfig.USERS.FILE_PATH,
];

const getMockedData = async () => {
  const [titles, descriptions, categories, comments, users] = await Promise.all(
      dataPaths.map((path) => readPublicationsFileContent(path))
  );

  return {
    titles,
    descriptions,
    categories,
    comments,
    users,
  };
};

module.exports = {
  getMockedData,
};
