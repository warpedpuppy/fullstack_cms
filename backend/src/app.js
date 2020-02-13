const express = require('express');
const app = express();

const testRouter = require('./testing/testing-router');
const authRouter = require('./auth/auth-router');
const demoRouter = require('./demo/demo-router');
const articlesRouter = require('./articles/articles-router');
const creatorsRouter = require('./creators/creators-router');
const eventsRouter = require('./events/events-router');
const adminRouter = require('./admin/admin-router');
const photoUploaderRouter = require('./photoUploader/photoUploader-router');
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use('/api/testing', testRouter);
app.use('/api/auth', authRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api/demo', demoRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/photo-uploader', photoUploaderRouter);
app.use('/api/events', eventsRouter);
app.use('/api/admin', adminRouter);
module.exports = app;