'use strict';

module.exports = function (app) {

    const MessageController = app.controllers.message;

    app.get('/message', MessageController.getRandomMessage);

};