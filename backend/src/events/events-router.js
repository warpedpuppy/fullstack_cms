const express = require('express')
const eventsRouter = express.Router()
const { requireAuth } = require('../middleware/auth-middleware')
const bcrypt = require('bcryptjs')
const jsonBodyParser = express.json();
const EventsService = require('./events-services');

eventsRouter
.get('/', async (req, res) => {
    let result = await EventsService.getEvents(req.app.get('db'))
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
.post('/new-event', jsonBodyParser, requireAuth, (req, res) => {
    let obj = req.body;
    EventsService.insertEvent(req.app.get('db'), obj)
    .then( event => {
          res
          .status(200)
          .json({success: true, event})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false})
    })
  })

module.exports = eventsRouter;