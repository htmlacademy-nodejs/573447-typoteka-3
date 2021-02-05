'use strict';

const http = require(`http`);
const io = require(`socket.io`);
const {logger} = require(`~/helpers`);
const {SocketEvent, HttpMethod} = require(`~/common/enums`);

const MIN_SOCKET_INDEX = 0;
const USER_COUNT_REMOVE = 1;

module.exports = (app) => {
  logger.info(`SocketIO start`);

  app.set(`socketObject`, {
    clients: [],
    distribution(action, data) {
      this.clients.forEach((client) => client.emit(action, data));

      return this;
    },
  });

  const server = http.createServer(app);

  io(server, {
    cors: {
      origins: `*:*`,
      methods: [HttpMethod.GET, HttpMethod.POST],
      credentials: true,
    },
  }).on(SocketEvent.CONNECTION, (socket) => {
    const {address: ip} = socket.handshake;
    logger.info(`Новое подключение: ${ip}`);

    const socketObject = app.get(`socketObject`);
    socketObject.clients.push(socket);

    socket.on(SocketEvent.DISCONNECT, () => {
      const foundSocketIndex = socketObject.clients.indexOf(socket);
      if (foundSocketIndex > MIN_SOCKET_INDEX) {
        socketObject.clients.splice(foundSocketIndex, USER_COUNT_REMOVE);
      }

      logger.info(`Клиент отключён: ${ip}`);
    });
  });

  return server;
};
