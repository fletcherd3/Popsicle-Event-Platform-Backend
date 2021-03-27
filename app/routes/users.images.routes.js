const usersImages = require('../controllers/users.images.controller');

module.exports = function (app) {
    app.route(app.rootUrl + '/users/:id/image')
        .put(usersImages.setUserImage);

    // app.route(app.rootUrl + '/users/:id/image')
    //     .get(usersImages.getUserImage);

    // app.route(app.rootUrl + '/users/:id/image')
    //     .delete(usersImages.deleteUserImage);
};
