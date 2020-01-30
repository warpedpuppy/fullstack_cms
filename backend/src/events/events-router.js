const express = require('express')
const eventsRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const EventsService = require('./events-services');

eventsRouter
.get('/', async (req, res) => {
    let result = await EventsService.getEvents(req.app.get('db'))
    console.log(result)
    if (result) {
        res
        .status(200)
        .json({success: true, result})
    } else {
        res
        .status(500)
        .json({success: false})
    }
})


module.exports = eventsRouter;