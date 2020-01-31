const Config = require('../config');

const EventsServices = {
    getEvents: function(db, obj) {
        return db(Config.EVENTS_TABLE)
        .orderBy('date_of_event')
        .then(events => events )
    },
    insertEvent (db, eventObj) {
        return EventsServices.insertEvent(db, eventObj.img_url)
                .then(id => {
                  eventObj.img_url = id;
                  return EventsServices.insertEvent(db, eventObj)
                })
      },
}
module.exports = EventsServices;