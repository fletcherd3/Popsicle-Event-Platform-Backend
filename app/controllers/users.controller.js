const user = require('../models/users.model');

exports.registerUser = async function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const registeredUsersId = await user.registerUser(firstName, lastName, email, password);
        res.status(201).send({"userId": registeredUsersId});
    } catch (err) {
        res.status(500).send( 'Internal Server Error');
    }
};
