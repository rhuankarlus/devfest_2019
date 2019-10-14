'use strict';

const fs = require('fs'),
    config = require('./config'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    express = require('express'),
    app = express(),
    load = require('express-load');

app.use(express.json());
app.use(cors());

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

function listen() {
    app.listen(config.server_port);
    console.log(`The server is up and running at port ${config.server_port}`);
}

function connectDatabase() {
    return mongoose.connect(config.db, {keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true});
}

function initialize() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connectDatabase)
        .once('open', listen);

    connectDatabase();
}

module.exports = app;

initialize();