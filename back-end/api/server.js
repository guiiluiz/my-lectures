const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { user, login, event } = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/login', login);
app.use('/event', event);

module.exports = app;
