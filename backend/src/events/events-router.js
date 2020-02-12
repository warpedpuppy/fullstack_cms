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
.get('/titles-for-edit', requireAuth, jsonBodyParser, async (req, res) => {
  if (req.tokenData.sub === 'admin') {
    let {offset, increment} = req.query;
    let result = await EventsService.getTitlesForEdit(req.app.get('db'), offset, increment);
    
    if (result) {
        res
        .status(200)
        .json({success: true, result})
    } else {
        res
        .status(500)
        .json({success: false})
    }
  }

})
.put('/event-for-edit', requireAuth, jsonBodyParser, async (req, res) => {
  let { id, eventname, description, date_of_event, time_start, time_end, img_url } = req.body;
  let obj = { id, eventname, description, date_of_event, time_start, time_end, img_url }; 
  let result = await EventsService.postEventForEdit(req.app.get('db'), obj);
  if (result) {
      res
      .status(200)
      .json({success: true, result})
  }
})
.get('/get-event-details/:id', requireAuth, async (req, res) => {
  let { id } = req.params;
  let result = await EventsService.getEventDetails(req.app.get('db'),id);
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
.get('/current-month-events', requireAuth, async (req, res) => {
  let result = await EventsService.currentMonthEvents(req.app.get('db'));
  if (result) {
        res
          .status(200)
          .json({success: true, events: result})
    } else {
      res
      .status(500)
      .json({success: false})
    }
})
.post('/new-event', jsonBodyParser, requireAuth, async (req, res) => {
    let obj = req.body;
    let result = await EventsService.insertEvent(req.app.get('db'), obj)
    
    if (result) {
        res
          .status(200)
          .json({success: true, event: result[0]})
    } else {
       res
      .status(500)
      .json({success: false})
    }
        
  
  })
  .delete('/delete-event', requireAuth, jsonBodyParser, async (req, res) => {
    let { id } = req.body;
    let result = await EventsService.deleteEvent(req.app.get('db'), id)
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