'use strict';

(() => {
  const MAX_DESCRIPTION_LENGTH = 100;
  const SOCKET_ORIGIN = 'http://localhost:3000';
  const SocketEvent = {
    CONNECT: `connect`,
    CONNECTION: `connection`,
    DISCONNECT: `disconnect`,
    UPDATE_COMMENTS: `update-comments`,
    UPDATE_ARTICLES: `update-articles`,
  };

  const articlesListNode = document.querySelector(`.hot__list`);
  const commentsListNode = document.querySelector(`.last__list`);
  const socket = io(SOCKET_ORIGIN, {
    withCredentials: true,
  });

  const createElement = (html) => {
    const element = document.createElement(`div`);

    element.innerHTML = html;

    return element.firstChild;
  };

  const getCutDescription = (text, maxLength = MAX_DESCRIPTION_LENGTH) => {
    const hasMore = text.length > maxLength;

    return hasMore ? `${text.slice(0, maxLength)}...` : text;
  };

  socket.addEventListener(SocketEvent.UPDATE_ARTICLES, (articles) => {
    articlesListNode.innerHTML = ``;

    articles.forEach(({id, announce, count}) => {
      articlesListNode.appendChild(
        createElement(`<li class="hot__list-item">
        <a class="hot__list-link" href="/articles/${id}">
          ${getCutDescription(announce)}
          <sup class="hot__link-sup">${count}</sup>
        </a>
      </li>`)
      );
    });
  });

  socket.addEventListener(SocketEvent.UPDATE_COMMENTS, (comments) => {
    commentsListNode.innerHTML = ``;

    comments.forEach(({text, article, user}) => {
      commentsListNode.appendChild(
        createElement(`<li class="last__list-item">
        <img class="last__list-image" src="img/${
          user.avatar
        }" width="20" height="20" alt="Аватар пользователя">
        <b class="last__list-name">${user.firstName} ${user.lastName}</b>
        <a class="last__list-link" href="/articles/${article.id}">
          ${getCutDescription(text)}
        </a>
      </li>`)
      );
    });
  });

  socket.addEventListener(SocketEvent.CONNECT, () => {
    console.log(`SocketIO - подключено`);
  });

  socket.addEventListener(SocketEvent.DISCONNECT, () => {
    console.log(`SocketIO - отключено`);
  });
})();
