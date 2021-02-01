'use strict';

const {ArticleKey, ArticleValidationMessage} = require(`~/common/enums`);

const fieldToErrorMessages = {
  [ArticleKey.TITLE]: [
    ArticleValidationMessage.TITLE_MIN_LENGTH,
    ArticleValidationMessage.TITLE_MAX_LENGTH,
    ArticleValidationMessage.TITLE_REQUIRE,
  ],
  [ArticleKey.CREATED_DATE]: [ArticleValidationMessage.CREATED_DATE_REQUIRE],
  [ArticleKey.CATEGORIES]: [
    ArticleValidationMessage.CATEGORIES_MIN_COUNT,
    ArticleValidationMessage.CATEGORIES_REQUIRE,
  ],
  [ArticleKey.ANNOUNCE]: [
    ArticleValidationMessage.ANNOUNCE_MIN_LENGTH,
    ArticleValidationMessage.ANNOUNCE_MAX_LENGTH,
    ArticleValidationMessage.ANNOUNCE_REQUIRE,
  ],
  [ArticleKey.FULL_TEXT]: [ArticleValidationMessage.FULL_TEXT_MAX_LENGTH],
};

module.exports = {
  fieldToErrorMessages,
};
