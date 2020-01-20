const express = require('express');
const app = express();

const testRouter = require('./testing/testing-router');

const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use('/api/testing', testRouter);

module.exports = app;