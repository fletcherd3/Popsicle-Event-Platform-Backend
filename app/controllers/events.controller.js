const users = require('../models/events.model');
const events = require('../models/events.model');
const {body, validationResult} = require('express-validator');


exports.getEvents = async function(req, res){
    try {
        let startIndex = req.query.startIndex;
        const count = req.query.count;
        const queryTerm = req.query.q;
        const categoryIds = req.query.categoryIds;
        const organizerId = req.query.organizerId;
        const sortBy = req.query.sortBy;

        // Set default value if Start Index is undefined
        if (startIndex == undefined) {
            startIndex = 0;
        }
        // Check that the start index is a positive number
        if(startIndex < 0 || isNaN(startIndex)){
            res.status(400).send('Bad Request');
            return;
        }

        // TODO: accept a list of Category Ids
        // Check if the Category Id is in the DB
        // if(categoryIds != undefined){
        //     // console.log(categoryIds);
        //     // const categorysInDb = await categoryIds.filter(category => events.isCatergoryInDb(category));
        //     const categoryInDb = await events.isCatergoryInDb(categoryIds);
        //     if(!categoryInDb) {
        //         res.status(400).send('Bad Request');
        //         return;
        //     }
        // }

        // Check that the organizer Id is a positive number
        if(organizerId != undefined) {
            if(organizerId < 0 || isNaN(organizerId)){
                res.status(400).send('Bad Request');
                return;
            }
        }

        // TODO: Add sort by attendance
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
    }
};