'use strict';

const {getNewComment, getCommentById, removeComment} = require(`./helpers`);

class Comments {
  findAll(article) {
    return article.comments;
  }

  create(article, comment) {
    const newComment = getNewComment(comment);

    article.comments.push(newComment);

    return newComment;
  }

  drop(article, commentId) {
    const removedComment = getCommentById(article.comments, commentId);

    if (!removedComment) {
      return null;
    }

    article.comments = removeComment(article.comments, removedComment);

    return removedComment;
  }
}

module.exports = Comments;
