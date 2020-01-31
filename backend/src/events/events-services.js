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
}
module.exports = EventsServices;