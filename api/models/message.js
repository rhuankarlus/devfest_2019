'use strict';

const fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    modelName = 'message',
    MessageSchema = mongoose.Schema({
        text: {type: String, default: ''},
        createdAt: {type: Date, default: Date.now}
    });

const MessageModel = mongoose.model(modelName, MessageSchema);

const exitSystem = (msg, error) => {
    console.error(msg);
    console.error(error);
    process.exit(1);
}

const persistMessage = (message) => {
    new MessageModel({ text: message }).save((saveError, saveResult) => {
        if (saveError) {
            exitSystem(`Error while persisting message: ${message}`, saveError);
        } else if (saveResult) {
            console.info(`MESSAGE ${message} PERSISTED...`);
        }
    });
};

const findAndPersist = (message) => {
    MessageModel.find({ text: message }).exec((err, users) => {
        if (err) {
            exitSystem(`The message ${message} couldn't be persisted!`, err);
        } else if (!users.length) {
            persistMessage(message);
        }
    });
}

const loadMessages = () => {
    const messages = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/messages.json')));
    messages.forEach(message => findAndPersist(message));
}

module.exports = function (app) {
    return MessageModel;
};

loadMessages();