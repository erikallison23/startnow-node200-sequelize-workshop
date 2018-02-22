const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');
const morgan = require('morgan');

/* sequelize configuration */
db.sequelize.sync();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Only /api/blogs or api/authors is working right now');
});

app.use('/api/authors', require('./db/routes/authors'));

app.use('/api/blogs', require('./db/routes/blogs'));

module.exports = app;
