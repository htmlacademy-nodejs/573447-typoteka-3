'use strict';

const {
  writeToFile,
  paintMessage,
  readFile,
  getRandomId,
  getRandomItem,
  getRandomItems,
  getRandomNumber,
  logger
} = require(`~/helpers`);
const {CliExitCode, ArticleKey, CommentKey, MessageColor} = require(`~/common/enums`);
const {MONTH_MILLISECONDS, MocksConfig} = require(`./common`);

const generateMockedComment = ({comments}) => ({
  [CommentKey.ID]: getRandomId(),
  [CommentKey.TEXT]: getRandomItems(
      comments,
      getRandomNumber(
          MocksConfig.COMMENTS.MIN_SENTENCES_COUNT,
          MocksConfig.COMMENTS.MAX_SENTENCES_COUNT
      )
  ).join(` `),
});

const generateMockedComments = ({count, comments}) => {
  const mockedComments = Array.from(new Array(count), () =>
    generateMockedComment({comments})
  );

  return mockedComments;
};

const generatePublication = ({titles, descriptions, categories, comments}) => ({
  [ArticleKey.ID]: getRandomId(),
  [ArticleKey.TITLE]: getRandomItem(titles),
  [ArticleKey.CREATED_DATE]: new Date(
      Date.now() -
      getRandomNumber(
          MocksConfig.DATE.MIN_MONTHS_BREAK,
          MONTH_MILLISECONDS * MocksConfig.DATE.MAX_MONTHS_BREAK
      )
  ),
  [ArticleKey.ANNOUNCE]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_ANNOUNCE_COUNT,
          MocksConfig.TEXT.MAX_ANNOUNCE_COUNT
      )
  ).join(` `),
  [ArticleKey.FULL_TEXT]: getRandomItems(
      descriptions,
      getRandomNumber(
          MocksConfig.TEXT.MIN_FULL_TEXT_COUNT,
          descriptions.length
      )
  ).join(` `),
  [ArticleKey.IMAGE]: `${getRandomItem(MocksConfig.IMAGES)}.jpg`,
  [ArticleKey.CATEGORY]: getRandomItems(
      categories,
      getRandomNumber(
          MocksConfig.CATEGORY.MIN_COUNT,
          MocksConfig.CATEGORY.MAX_COUNT
      )
  ),
  [ArticleKey.COMMENTS]: generateMockedComments({
    count: getRandomNumber(
        MocksConfig.COMMENTS.MIN_COUNT,
        MocksConfig.COMMENTS.MAX_COUNT
    ),
    comments
  }),
});

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

const savePublicationsToFile = async (mockedPublications) => {
  try {
    await writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedPublications));

    logger.info(paintMessage(`Operation success. File with mocks was created.`, MessageColor.GREEN));
  } catch (err) {
    logger.error(
        paintMessage(
            `An error occurred on saving mocked-data: can't write mocked-data to file...: ${err.message}`,
            MessageColor.RED
        )
    );

    process.exit(CliExitCode.ERROR);
  }
};

const readPublicationsFileContent = async (path) => {
  try {
    const content = await readFile(path);

    return content.trim().split(`\n`);
  } catch (err) {
    logger.error(
        paintMessage(
            `An error occurred on reading mocked-data: can't read mocked-data from file...`,
            MessageColor.RED
        )
    );

    return [];
  }
};

const getPublicationsData = async () => {
  const titles = await readPublicationsFileContent(MocksConfig.TITLE.FILE_PATH);
  const descriptions = await readPublicationsFileContent(MocksConfig.TEXT.FILE_PATH);
  const categories = await readPublicationsFileContent(MocksConfig.CATEGORY.FILE_PATH);
  const comments = await readPublicationsFileContent(MocksConfig.COMMENTS.FILE_PATH);

  return {
    titles,
    descriptions,
    categories,
    comments,
  };
};

module.exports = {
  generateMockedComment,
  generateMockedComments,
  generatePublication,
  generatePublications,
  savePublicationsToFile,
  readPublicationsFileContent,
  getPublicationsData,
};
