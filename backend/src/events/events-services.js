const Config = require('../config');

const EventsServices = {
    getEvents: function(db) {
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
    getTitlesForEdit: function(db, offset, increment) {

        return db(Config.EVENTS_TABLE)
        .select('id', 'eventname', 'date_of_event')
        .orderBy('id', 'desc')
        .limit(increment)
        .offset(offset)
        .returning("*")
        .then(events => events)
    },
    currentMonthEvents: function(db) {
        let date = new Date();
        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return db(Config.EVENTS_TABLE)
        .select('*')
        .where('date_of_event', '>=', startDate)
        .where('date_of_event', '<', endDate)
        .returning("*")
        .then(events => events)
    },
    getEventDetails: function(db, id) {
        return db(Config.EVENTS_TABLE)
        .where({id})
        .returning("*")
        .then(event => event)
    },
    postEventForEdit: function(db, obj) {
        let date = new Date();
        let { id, eventname, description, date_of_event, time_start, time_end, img_url } = obj;
        return db(Config.EVENTS_TABLE)
        .where({id})
        .update({
            eventname,
            description,
            date_of_event,
            time_start,
            time_end,
            img_url,
            date_modified: date
        })
        .then(result => result)
    },
    deleteEvent: function(db, id) {
        return db(Config.EVENTS_TABLE)
        .where({id})
        .del()
    }
}
module.exports = EventsServices;