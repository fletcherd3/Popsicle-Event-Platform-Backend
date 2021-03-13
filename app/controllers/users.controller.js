const users = require('../models/users.model');
const crypto = require('crypto')
const {body, validationResult} = require('express-validator')

exports.validateUserReq = function () {
    return [
        body('firstName').isLength({ min: 1 }),
        body('lastName').isLength({ min: 1 }),
        body('email').isEmail(),
        body('password').isLength({ min: 1 })
    ]
}

exports.registerUser = async function(req, res){
    try {
        // Validate request using validateUserReq
        const requestErrors = await validationResult(req);
        if (!requestErrors.isEmpty()) {
            console.log(requestErrors);
            res.status(400).send('Bad Request');
            return;
        }

        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        // Check if email already exists
        const emailInDB = await users.isEmailInDb(email);
        if (emailInDB) {
            res.status(400).send('Bad Request');
            return;
        }

        // Register the valid user
        const registeredUsersId = await users.registerUser(firstName, lastName, email, password);
        res.status(201).send({"userId": registeredUsersId});
    } catch (err) {
        res.status(500).send('Internal Server Error');
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
            return;
        }

        // Create, store and send userToken
        const userToken = crypto.randomBytes(16).toString('hex');
        await users.setUserToken(userToken, email);
        const userId = await users.getUserIdByEmail(email);

        res.status(200).send({"userId": userId, "token": userToken})
    } catch (err) {
        res.status(500).send( 'Internal Server Error');
    }
};

exports.logoutUser = async function (req, res) {
    try{
        // Get users token from header and check if active, if not send 401
        const userToken = req.header('x-authorization');
        const isValidToken = await users.isTokenInDb(userToken);

        if(!isValidToken){
            res.status(401).send('Unauthorized')
            return;
        }

        await users.deleteToken(userToken);
        res.status(200).send('OK')
    } catch (err){
        res.status(500).send('Internal Server Error');
    }
};

exports.getUser = async function (req, res) {
    try{
        const requestedId = req.params.id;
        let usersData, isMatchingUser;

        // Check whether the user is in the Database, if not send 404
        const userInDB = await users.isUserInDb(requestedId);
        if (!userInDB){
            res.status(404).send("Not Found");
            return;
        }

        // Get users token from header and check if exists & active
        const userToken = req.header('x-authorization');
        const reqHasToken = !(userToken === undefined);
        const isValidToken = (await users.isTokenInDb(userToken) && reqHasToken);

        // Check whether requesting user is viewing their own details
        if (isValidToken) {
            const requestingId = await users.getUserIdByToken(userToken);
            isMatchingUser = requestingId == requestedId;
        } else {
            isMatchingUser = false;
        }

        // Gather user data depending on whether user is viewing own details
        if(isMatchingUser){
            const authUser = await users.getAuthUser(requestedId);
            usersData = {
                "firstName": authUser.first_name,
                "lastName": authUser.last_name,
                "email": authUser.email
            }
        } else {
            const nonAuthUser = await users.getNonAuthUser(requestedId);
            usersData = {
                "firstName": nonAuthUser.first_name,
                "lastName": nonAuthUser.last_name
            }
        }

        res.status(200).send(usersData);
    } catch (err){
        res.status(500).send('Internal Server Error');
    }
};

