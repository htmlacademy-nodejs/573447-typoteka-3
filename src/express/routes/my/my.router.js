'use strict';

const {Router} = require(`express`);
const {ApiMyRoute} = require(`~/common/enums`);

const myRouter = new Router();

myRouter.get(ApiMyRoute.ROOT, (_, res) => {
  const content = {
    articleList: [
      {
        id: 1,
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        title: `AirPods в один клик`,
      },
      {
        id: 2,
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        title: `AirPods в один клик`,
      },
      {
        id: 3,
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        title: `AirPods в один клик`,
      },
    ],
  };

  res.render(`pages/my/my`, content);
});
myRouter.get(ApiMyRoute.COMMENTS, (_, res) => {
  const content = {
    commentList: [
      {
        account: {
          type: `user`,
          avatar: `img/avatar-1.png`,
          name: `Евгений Петров`,
        },
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        text: `Автор, ты все выдумал, покайся`,
        articleTitle: `AirPods в один клик`,
      },
      {
        account: {
          type: `user`,
          avatar: `img/avatar-5.png`,
          name: `Александр Марков`,
        },
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        text: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
        articleTitle: `AirPods в один клик`,
      },
      {
        account: {
          type: `user`,
          avatar: `img/avatar-4.png`,
          name: `Евгений Петров`,
        },
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        text: `Автор, ты все выдумал, покайся`,
        articleTitle: `AirPods в один клик`,
      },
      {
        account: {
          type: `user`,
          avatar: `img/avatar-3.png`,
          name: `Александр Марков`,
        },
        date: {
          stamp: `2019-03-21T20:33`,
          day: `21.03.2019`,
          time: `20:33`,
        },
        text: `Конечно, прежде чем так писать, нужно искренне приложить усилия, чтобы разобраться — не все люди умеют выражать свои мысли.`,
        articleTitle: `AirPods в один клик`,
      },
    ],
  };

  res.render(`pages/my/comments`, content);
});

module.exports = myRouter;
