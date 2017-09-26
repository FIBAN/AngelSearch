'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', require('./controllers'));

app.use(express.static(path.join(__dirname, '/dist')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log(`Starting app using ${config.env} config`);
app.listen(config.port, () => {
    console.log(`Listening on ${config.port}`);
});

module.exports = app;