const events = require('../controllers/events.controller');

module.exports = function (app) {
    app.route(app.rootUrl + '/events/categories')
        .get(events.getCategories);

    app.route(app.rootUrl + '/events')
        .get(events.getEvents);

    app.route(app.rootUrl + '/events')
        .post(events.validateEventReq('create'))
        .post(events.addEvent);

    app.route(app.rootUrl + '/events/:id')
        .get(events.getEvent);

    app.route(app.rootUrl + '/events/:id')
        .patch(events.validateEventReq('update'))
        .patch(events.updateEvent);

    app.route(app.rootUrl + '/events/:id')
        .delete(events.deleteEvent);
};
