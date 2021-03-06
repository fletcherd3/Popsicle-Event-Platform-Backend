const users = require('../models/users.model');
const crypto = require('crypto')

exports.registerUser = async function(req, res){
    // TODO: Correct error code responses
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        const registeredUsersId = await users.registerUser(firstName, lastName, email, password);
        res.status(201).send({"userId": registeredUsersId});
    } catch (err) {
        res.status(500).send( 'Internal Server Error');
    }
};

exports.loginUser = async function(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Validate user credentials
        const isLoginValid = await users.isLoginValid(email, password);
        if (!isLoginValid) {
            res.status(400).send('Bad Request');
        }

        // Create, store and send userToken
        const userToken = crypto.randomBytes(16).toString('hex');
        await users.setUserToken(userToken, email);
        const userId = await users.getUserId(email);

        res.status(200).send({"userId": userId, "token": userToken})
    } catch (err) {
        res.status(500).send( 'Internal Server Error');
    }
};
