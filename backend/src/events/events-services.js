const Config = require('../config');

const EventsServices = {
    getEvents: function(db, obj) {
        return db(Config.EVENTS_TABLE)
        .then(events => events.rows)
    }
}
module.exports = EventsServices;