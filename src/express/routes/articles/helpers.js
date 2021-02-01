'use strict';

const {ArticleKey, CommentKey} = require(`~/common/enums`);
const {fieldToErrorMessages} = require(`./common`);

const getMessageByField = (messages) => {
  return Object.keys(fieldToErrorMessages).reduce((acc, key) => {
    const currentMessages = fieldToErrorMessages[key].filter((message) => {
      return messages.includes(message);
    });

    acc[key] = currentMessages;

    return acc;
  }, {});
};

const getParsedCategories = (categories) => {
  if (!categories) {
    return [];
  }

  return Array.isArray(categories)
    ? categories.map(Number)
    : [Number(categories)];
};

const getArticleData = (body, file) => ({
  [ArticleKey.IMAGE]: file ? file.filename : null,
  [ArticleKey.TITLE]: body.title,
  [ArticleKey.ANNOUNCE]: body.announce,
  [ArticleKey.CREATED_DATE]: new Date(body.createdDate).toISOString(),
  [ArticleKey.FULL_TEXT]: body.fullText || null,
  [ArticleKey.CATEGORIES]: getParsedCategories(body.category),
});

const getCommentsData = (body) => ({
  [CommentKey.TEXT]: body.text,
  [CommentKey.USER_ID]: Number(body.userId),
});

module.exports = {
  getMessageByField,
  getParsedCategories,
  getArticleData,
  getCommentsData,
};
