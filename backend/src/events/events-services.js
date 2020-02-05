const Config = require('../config');

const EventsServices = {
    getEvents: function(db, obj) {
        return db(Config.EVENTS_TABLE)
        .orderBy('date_of_event')
        .then(events => events )
    },
    insertEvent (db, eventObj) {
        return db(Config.EVENTS_TABLE)
        .insert(eventObj)
        .returning("*")
        .then(event => event)
    },
    getTitlesForEdit: function(db) {

        return db(Config.EVENTS_TABLE)
        .select('id', 'eventname', 'date_of_event')
        .returning("*")
        .then(events => events)
    },
    getEventDetails: function(db, id) {
        return db(Config.EVENTS_TABLE)
        .where({id})
        .returning("*")
        .then(event => event)
    }
}
module.exports = EventsServices;