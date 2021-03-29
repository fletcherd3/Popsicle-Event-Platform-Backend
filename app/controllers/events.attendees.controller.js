const events = require('../models/events.model');
const users = require('../models/users.model');
const eventAttendee = require('../models/events.attendees.model');


exports.getEventAttendees = async function (req, res) {
    let isMatchingUser;
    try {
        const eventId = req.params.id;

        // Check whether the event is in the Database, if not send 404
        const event = await events.getEvent(eventId);
        if (!event) {
            res.status(404).send("Not Found");
            return;
        }

        // Get users token from header and check if exists & active
        const userToken = req.header('x-authorization');
        const reqHasToken = !(userToken === "null");
        const isValidToken = (reqHasToken && await users.isTokenInDb(userToken));

        // Check whether requesting user is viewing their own event
        let requestingId = -1; // Non-existing userId
        if (isValidToken) {
            requestingId = await users.getUserIdByToken(userToken);
            isMatchingUser = requestingId === event.organizerId;
        } else {
            isMatchingUser = false;
        }

        let eventAttendees;
        if (isMatchingUser) {
            eventAttendees = await eventAttendee.getAuthdEventsAttendees(eventId);
        } else {
            eventAttendees = await eventAttendee.getNonAuthdEventsAttendees(eventId, requestingId);
        }

        res.status(200).send(eventAttendees);
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

exports.requestAttendance = async function (req, res) {
    try {
        // Get users token from header and check if active, if not send 401
        const userToken = req.header('x-authorization');
        const userId = await users.getUserIdByToken(userToken);
        if (!userId) {
            res.status(401).send('Unauthorized');
            return;
        }

        // Check whether the event is in the Database, if not send 404
        const eventIdToJoin = req.params.id;
        const eventInDB = await events.isEventIDInDB(eventIdToJoin);
        if (!eventInDB) {
            res.status(404).send("Not Found");
            return;
        }

        // Check if the User has already joined the event, if not send 403
        const hasUserJoinedEvent = await eventAttendee.hasUserJoinedEvent(eventIdToJoin, userId);
        const isEventInPast = await eventAttendee.isEventInPast(eventIdToJoin);
        const isForbidden = hasUserJoinedEvent || isEventInPast;
        if (isForbidden) {
            res.status(403).send('Forbidden');
            return;
        }

        await eventAttendee.requestAttendance(eventIdToJoin, userId);

        res.status(201).send("Created");
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

exports.removeAttendance = async function (req, res) {
    try {
        // Get users token from header and check if active, if not send 401
        const userToken = req.header('x-authorization');
        const userId = await users.getUserIdByToken(userToken);
        if (!userId) {
            res.status(401).send('Unauthorized');
            return;
        }

        // Check whether the event is in the Database, if not send 404
        const eventIdToLeave = req.params.id;
        const eventInDB = await events.isEventIDInDB(eventIdToLeave);
        if (!eventInDB) {
            res.status(404).send("Not Found");
            return;
        }

        // Check if the User has already joined the event, if not send 403
        const hasUserJoinedEvent = await eventAttendee.hasUserJoinedEvent(eventIdToLeave, userId);
        const isEventInPast = await eventAttendee.isEventInPast(eventIdToLeave);
        const isUserIsRejected = await eventAttendee.isUserIsRejected(eventIdToLeave, userId);
        const isForbidden = !hasUserJoinedEvent || isEventInPast || isUserIsRejected;
        if (isForbidden) {
            res.status(403).send('Forbidden');
            return;
        }

        await eventAttendee.removeAttendance(eventIdToLeave, userId);

        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};

exports.updateAttendance = async function (req, res) {
    const eventId = req.params.event_id;
    const userId = req.params.user_id;
    const userToken = req.header('x-authorization');
    try {
        // Get users token from header and check if active, if not send 401
        const requestingId = await users.getUserIdByToken(userToken);
        if (!requestingId) {
            res.status(401).send('Unauthorized');
            return;
        }

        // Check if the requesting User is editing their own event attendance, if not send 403
        const organiserId = await events.getOrganiserId(eventId);
        const isEventsOrganiser = requestingId == organiserId;
        if (!isEventsOrganiser) {
            res.status(403).send('Forbidden');
            return;
        }

        // Check whether the event/user is in the Database, if not send 404
        const isUserAttendingEvent = await eventAttendee.isUserAttendingEvent(requestingId, eventId);
        if (!isUserAttendingEvent) {
            res.status(404).send("Not Found");
            return;
        }

        // Check if the body contains a valid content
        const validStatus = {
            'accepted': 1,
            'pending': 2,
            'rejected': 3
        };
        const statusValue = validStatus[req.body.status];
        if (!statusValue) {
            res.status(400).send("Bad Request");
            return;
        }

        await eventAttendee.updateAttendance(userId, eventId, statusValue);

        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
};