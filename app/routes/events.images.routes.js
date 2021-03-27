const eventsImages = require('../controllers/events.images.controller');

module.exports = function (app) {
    app.route(app.rootUrl + '/events/:id/image')
        .get(eventsImages.getEventImage);

    app.route(app.rootUrl + '/events/:id/image')
        .put(eventsImages.setEventImage);
};
