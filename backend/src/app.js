const express = require('express');
const app = express();

const testRouter = require('./testing/testing-router');
const authRouter = require('./auth/auth-router');
const demoRouter = require('./demo/demo-router');
const creatorsRouter = require('./creators/creators-router');
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use('/api/testing', testRouter);
app.use('/api/auth', authRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/demo', demoRouter);
module.exports = app;