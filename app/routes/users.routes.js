const users = require('../controllers/users.controller');

module.exports = function (app) {

    app.post(app.rootUrl + '/users/register',
        users.validateUserReq(),
        users.registerUser);

    app.route(app.rootUrl + '/users/login')
        .post(users.loginUser);

    app.route(app.rootUrl + '/users/logout')
        .post(users.logoutUser);

    app.route(app.rootUrl + '/users/:id')
        .get(users.getUser);
    //
    // app.route(app.rootUrl + '/users/:id')
    //     .patch(users.updateUser);
};
