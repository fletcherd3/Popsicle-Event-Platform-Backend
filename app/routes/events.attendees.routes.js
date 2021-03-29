const eventsAttendees = require('../controllers/events.attendees.controller');

module.exports = function (app) {
    app.route(app.rootUrl + '/events/:id/attendees')
        .get(eventsAttendees.getEventAttendees);

    app.route(app.rootUrl + '/events/:id/attendees')
        .post(eventsAttendees.requestAttendance);

    app.route(app.rootUrl + '/events/:id/attendees')
        .delete(eventsAttendees.removeAttendance);

    app.route(app.rootUrl + '/events/:event_id/attendees/:user_id')
        .patch(eventsAttendees.updateAttendance);
};
