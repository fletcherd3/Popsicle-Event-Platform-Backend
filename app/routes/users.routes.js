const users = require('../controllers/users.controller');

module.exports = function (app) {

    app.route(app.rootUrl + '/users/register')
        .post(users.validateUserReq('register'))
        .post(users.registerUser);

    app.route(app.rootUrl + '/users/login')
        .post(users.loginUser);

    app.route(app.rootUrl + '/users/logout')
        .post(users.logoutUser);

    app.route(app.rootUrl + '/users/:id')
        .get(users.getUser)
        .patch(users.validateUserReq('update'))
        .patch(users.updateUser);

};
