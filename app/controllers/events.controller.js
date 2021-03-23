const users = require('../models/users.model');
const events = require('../models/events.model');
const {body, validationResult, check} = require('express-validator');


exports.validateEventReq = (reqType) => {
    return [
        check('date').custom(value => {
            let enteredDate = new Date(value);
            let todaysDate = new Date();
            if (enteredDate < todaysDate) {
                throw new Error("Invalid Date");
            }
            return true;
        }),
        body([
            'title',
            'description',
            'categoryIds'
        ]).exists().isLength({ min: 1 })
    ]
};

exports.getEvents = async function(req, res){
    try {
        let startIndex = req.query.startIndex;
        const count = req.query.count;
        const queryTerm = req.query.q;
        let categoryIds = req.query.categoryIds;
        categoryIds = categoryIds === undefined || Array.isArray(categoryIds) ? categoryIds : [categoryIds];
        const organizerId = req.query.organizerId;
        const sortBy = req.query.sortBy;

        // Set default value if Start Index is undefined
        if (startIndex === undefined) {
            startIndex = 0;
        }
        // Check that the start index is a positive number
        if(startIndex < 0 || isNaN(startIndex)){
            res.status(400).send('Bad Request');
            return;
        }

        // Check if the Category Ids are in the DB
        if(categoryIds != undefined){
            let categoriesInDb = [];
            for (let i = 0; i < categoryIds.length; i++) {
                if (await events.isCatergoryInDb(categoryIds[i])) {
                    categoriesInDb.push(categoryIds[i]);
                }
            }
            categoryIds = categoriesInDb;
            if(categoriesInDb.length === 0) {
                res.status(400).send('Bad Request');
                return;
            }
        }

        // Check that the organizer Id is a positive number
        if(organizerId != undefined) {
            if(organizerId < 0 || isNaN(organizerId)){
                res.status(400).send('Bad Request');
                return;
            }
        }

        // Order by title
        let sortQuery;
        if(sortBy === 'ALPHABETICAL_ASC'){
            sortQuery = 'ORDER BY title ASC'
        } else if (sortBy === 'ALPHABETICAL_DESC'){
            sortQuery = 'ORDER BY title DESC'
        // Order by capacity
        } else if (sortBy === 'CAPACITY_ASC'){
            sortQuery = 'ORDER BY capacity ASC'
        } else if (sortBy === 'CAPACITY_DESC') {
            sortQuery = 'ORDER BY capacity DESC'
        // Order by approved attendees
        } else if (sortBy === 'ATTENDEES_ASC'){
            sortQuery = 'ORDER BY numAcceptedAttendees ASC'
        } else if (sortBy === 'ATTENDEES_DESC') {
            sortQuery = 'ORDER BY numAcceptedAttendees DESC'
        // Order by date
        } else if (sortBy === 'DATE_ASC'){
            sortQuery = 'ORDER BY date ASC'
        } else if (sortBy === 'DATE_DESC' || sortBy === undefined) {
            sortQuery = 'ORDER BY date DESC'
        } else {
            res.status(400).send('Bad Request');
            return;
        }

        // Make the query and get the results
        let eventResults = await events.getEvents(queryTerm, categoryIds, organizerId, sortQuery);
        eventResults = eventResults.splice(startIndex);

        // If a count is passed then only return at the most 'count' events
        if (count != undefined){
            if(count < 0 || isNaN(count)){
                res.status(400).send('Bad Request');
                return;
            }
            // Only return events after the passed in start index
            eventResults.splice(count);
        }

        res.status(200).send(eventResults);
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

exports.addEvent = async function(req, res){
    try {
        // Get users token from header and check if active, if not send 401
        const userToken = req.header('x-authorization');
        const userId = await users.isTokenInDb(userToken);
        if(!userId){
            res.status(401).send('Unauthorized');
            return;
        }

        // Validate request using validateEventReq
        const requestErrors = await validationResult(req);
        if (!requestErrors.isEmpty()) {
            console.log(requestErrors);
            res.status(400).send('Bad Request');
            return;
        }

        const title = req.body.title;
        const description = req.body.description;
        let categoryIds = req.body.categoryIds;
        categoryIds = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
        const date = req.body.date;
        const isOnline = req.body.isOnline;
        const url = req.body.url;
        const venue = req.body.venue;
        let capacity = req.body.capacity;
        capacity = capacity === undefined ? null : capacity;
        const requiresAttendanceControl = req.body.requiresAttendanceControl;
        const fee = req.body.fee;


        // Check if the Category Ids are in the DB
        let categoriesInDb = [];
        for (let i = 0; i < categoryIds.length; i++) {
            if (await events.isCatergoryInDb(categoryIds[i])) {
                categoriesInDb.push(categoryIds[i]);
            }
        }
        categoryIds = categoriesInDb;
        if(categoryIds.length === 0) {
            res.status(400).send('Bad Request');
            return;
        }

        let eventInDB = await events.isEventInDB(title, date, userId);
        if (eventInDB) {
            res.status(400).send('Bad Request');
            return;
        }

        // Register the valid event
        const newEventId = await events.addEvent(
            title, description, categoryIds, date, isOnline, url, venue,capacity, requiresAttendanceControl, fee, userId);
        res.status(201).send({"eventId": newEventId});
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

exports.getEvent = async function(req, res){
    try {
        const requestedId = req.params.id;

        // Check whether the event is in the Database, if not send 404
        const event = await events.getEvent(requestedId);
        if (!event){
            res.status(404).send("Not Found");
            return;
        }

        res.status(200).send(event);
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

// exports.addEvent = async function(req, res){
//     try {
//
//         res.status(200).send(thing);
//     } catch (err) {
//         res.status(500).send('Internal Server Error');
//         console.log(err);
//     }
// };