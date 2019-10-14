'use strict';

const environments = {
    "dev": {
        "server_port": 3000,
        "mongo_db_url": "mongodb://localhost/devfest",
    },
    "test": {
        "server_port": 3001,
        "mongo_db_url": "mongodb://localhost/devfest_test",
    },
    "docker": {
        "server_port": process.env.SERVER_PORT,
        "mongo_db_url": process.env.MONGO_DB_URL,
    },
    "prod": {
        "server_port": process.env.SERVER_PORT,
        "mongo_db_url": process.env.MONGO_DB_URL,
    },
};

const fs = require('fs');

module.exports = {
    server_port: environments[process.env.NODE_ENV || "dev"]["server_port"],
    db: environments[process.env.NODE_ENV || "dev"]["mongo_db_url"]
};
