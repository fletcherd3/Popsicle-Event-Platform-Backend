const express = require('express');
const bodyParser = require('body-parser');
const { allowCrossOriginRequestsMiddleware } = require('../app/middleware/cors.middleware');


module.exports = function () {
    // INITIALISE EXPRESS //
    const app = express();
    app.rootUrl = '/api/v1';

    // MIDDLEWARE
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({ type: 'text/plain' }));  // for the /executeSql endpoint

    // ROUTES
    require('../app/routes/backdoor.routes')(app);
    require('../app/routes/events.routes')(app);
    // require('../app/routes/events.images.routes')(app);
    // require('../app/routes/events.attendees.routes')(app);
    require('../app/routes/users.routes')(app);
    // require('../app/routes/users.images.routes')(app);

    return app;
};
