require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');
const Backdoor = require('./app/models/backdoor.model');

const app = express();
const port = process.env.PORT || 4941;

// Test connection to MySQL on start-up
async function testDbConnection() {
    try {
        await db.createPool();
        await db.getPool().getConnection();
    } catch (err) {
        console.error(`Unable to connect to MySQL: ${err.message}`);
        process.exit(1);
    }
}

// Move the images from the default dir
Backdoor.loadImages();

testDbConnection()
    .then(function () {
        app.listen(port, function () {
            console.log(`Listening on port: ${port}`);
        });
    });
