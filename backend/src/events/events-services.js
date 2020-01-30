const Config = require('../config');

const EventsServices = {
    getEvents: function(db, obj) {
        return db(Config.EVENTS_TABLE)
        .orderBy('date_of_event')
        .then(events => events )
    }
}
module.exports = EventsServices;