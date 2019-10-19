'use strict';

module.exports = function (app) {

    const MessageModel = app.models.message;
    const localIP = require('ip').address();

    const handleError = (err, res) => {
        res.status(500).json(err);
    };

    function getRandomMessage(res) {
        MessageModel.count().exec((err, count) => {
            if (err) {
                handleError(err, res);
                return;
            }

            const random = Math.floor(Math.random() * count)
            MessageModel.findOne().skip(random).exec((err, message) => {
                if (err || !message) {
                    handleError(err, res);
                    return;
                }

                res.json({ message, ip: localIP });
            });
        });
    }

    return {
        getRandomMessage: (req, res) => getRandomMessage(res),
    };

};