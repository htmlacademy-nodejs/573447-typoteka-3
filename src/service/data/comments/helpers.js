'use strict';

const {getRandomId, getItemByKey, removeItemByKey} = require(`~/helpers`);
const {CommentKey} = require(`~/common/enums`);

const getCommentById = (comments, id) => {
  const commentById = getItemByKey(comments, CommentKey.ID, id);

  return commentById;
};

const getNewComment = (comment) => {
  const newComment = {
    ...comment,
    [CommentKey.ID]: getRandomId(),
  };

  return newComment;
};

const removeComment = (comments, removedComment) => {
  const updatedComments = removeItemByKey(
      comments,
      CommentKey.ID,
      removedComment.id
  );

  return updatedComments;
};

module.exports = {
  getCommentById,
  getNewComment,
  removeComment,
};
