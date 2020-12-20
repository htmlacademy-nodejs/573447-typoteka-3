'use strict';

const {Router} = require(`express`);
const {SsrPath, SsrMyPath} = require(`~/common/enums`);

const initMyRouter = (app, settings) => {
  const myRouter = new Router();
  const {api} = settings;

  app.use(SsrPath.MY, myRouter);

  myRouter.get(SsrMyPath.ROOT, async (_, res) => {
    const articles = await api.getArticles();

    return res.render(`pages/my/my`, {
      scriptList: [`js/main.js`],
      articleList: articles,
    });
  });

  myRouter.get(SsrMyPath.COMMENTS, (_, res) => {
    return res.render(`pages/my/comments`, {
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
    });
  });
};

module.exports = {
  initMyRouter,
};
