const db = require('../../config/db');

exports.isCatergoryInDb = async function (categoryId) {
    const query = 'SELECT id FROM category WHERE id = ?';
    const [rows] = await db.getPool().query(query, [categoryId]);
    return rows.length > 0;
};

getEventsCategories = async function (eventId) {
    // Get the categories for each event and format them into an array
    const query = 'SELECT category_id FROM event_category WHERE event_id = ?';

    let categoriesResult = await db.getPool().query(query, [eventId]);
    categoriesResult = categoriesResult[0];
    let eventsCategories = [];
    for (let j = 0; j < categoriesResult.length; j++) {
        eventsCategories.push(categoriesResult[j].category_id);
    }

    return eventsCategories;
};

getEventsAttendees = async function (eventId) {
    const query = 'SELECT count(*) AS numAcceptedAttendees FROM event_attendees WHERE event_id = ? AND attendance_status_id = 1';
    const [result] = await db.getPool().query(query, [eventId]);
    return result[0].numAcceptedAttendees;
};

exports.getEvents = async function (queryTerm, categoryIds, organizerId, sortQuery) {
    let queryValues = [];
    let query = `SELECT E.id AS eventId, E.title, U.first_name AS organizerFirstName, U.last_name AS organizerLastName, E.capacity
                FROM event E   
                JOIN user U ON E.organizer_id = U.id
                JOIN event_category C ON E.id = C.event_id`;

    if (queryTerm !== undefined) {
        query += ` AND (E.title LIKE ? OR E.description LIKE ?)`;
        queryValues.push("%" + queryTerm + "%", "%" + queryTerm + "%");
    }

    if (categoryIds !== undefined) {
        query += ' AND C.category_id IN (?)';
        queryValues.push(categoryIds);
    }

    if (organizerId !== undefined) {
        query += ' AND E.organizer_id = ?';
        queryValues.push(organizerId);
    }

    query += ' GROUP BY E.id, E.title, U.first_name, U.last_name, E.capacity ';
    query += sortQuery;
    const [events] = await db.getPool().query(query, queryValues);


    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        event.categories = await getEventsCategories(event.eventId);
        event.numAcceptedAttendees = await getEventsAttendees(event.eventId);
    }

    return events;
};

exports.addEvent = async function (
    title, description, categoryIds, date, isOnline, url, venue, capacity, requiresAttendanceControl, fee, userId) {
    let query = 'INSERT INTO event ' +
        '(title, description, date, is_online, url, venue, capacity, requires_attendance_control, fee, organizer_id) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const rows = await db.getPool().query(query, [title, description, date, isOnline, url, venue, capacity, requiresAttendanceControl, fee, userId]);
    const eventId = rows[0].insertId;

    // Add the categories to the DB
    query = 'INSERT INTO event_category (event_id, category_id) VALUES (?, ?)';
    for (let i = 0; i < categoryIds.length; i++) {
        await db.getPool().query(query, [eventId, categoryIds[i]]);
    }

    // Return the ID of registered User
    return eventId;
};

exports.isEventInDB = async function (title, date, userId) {
    // Remove milliseconds
    date = date.replace(/\.\d+/, "");
    const query = 'SELECT * FROM event WHERE title = ? AND date = ? AND organizer_id = ?';
    const [rows] = await db.getPool().query(query, [title, date, userId]);

    return rows.length > 0;
};

exports.isEventIDInDB = async function (eventId) {
    const query = 'SELECT * FROM event WHERE id = ?';
    const [rows] = await db.getPool().query(query, [eventId]);

    return rows.length > 0;
};

exports.getOrganiserId = async function (eventId) {
    const query = 'SELECT organizer_id FROM event WHERE id = ?';
    const [rows] = await db.getPool().query(query, [eventId]);

    return rows[0].organizer_id;
};

exports.getEvent = async function (eventId) {
    let query = `SELECT E.id AS eventId, title, first_name AS organizerFirstName, last_name AS organizerLastName,
        count(A.id) AS numAcceptedAttendees, capacity, description, organizer_id AS organizerId, date,
        is_online AS isOnline, url, venue, requires_attendance_control AS requiresAttendanceControl, fee
        FROM event E
        JOIN user U ON E.organizer_id = U.id
        JOIN event_attendees A ON A.event_id = E.id
        WHERE attendance_status_id = 1 AND E.id = ?`;

    let [event] = await db.getPool().query(query, [eventId]);
    event = event[0];

    // No event was found
    if (event.eventId === null) {
        return undefined;
    }

    // Get the categories for the event and format them into an array
    query = 'SELECT category_id FROM event_category WHERE event_id = ?';
    let [categoriesResult] = await db.getPool().query(query, [event.eventId]);
    let eventsCategories = [];
    for (let j = 0; j < categoriesResult.length; j++) {
        eventsCategories.push(categoriesResult[j].category_id);
    }
    event.categories = eventsCategories;
    // Map 1 to True, 0 to False
    event.isOnline = event.isOnline === 1;
    event.requiresAttendanceControl = event.requiresAttendanceControl === 1;

    return event;
};

exports.updateEventsCategories = async function (eventId, categories) {
    let query = 'DELETE FROM event_category WHERE event_id = ?';
    await db.getPool().query(query, [eventId]);

    query = 'INSERT INTO event_category (event_id, category_id) VALUES (?, ?)'
    for (var i = 0; i < categories.length; i++) {
        await db.getPool().query(query, [eventId, categories[i]]);
    }
};

exports.updateEvent = async function (eventId, event) {
    let queryValues = [];
    let query = 'UPDATE event SET ';

    if (event.title !== undefined) {
        query += "title = ?, ";
        queryValues.push(event.title);
    }
    if (event.description !== undefined) {
        query += "description = ?, ";
        queryValues.push(event.description);
    }
    if (event.date !== undefined) {
        query += "date = ?, ";
        queryValues.push(event.date);
    }
    if (event.isOnline !== undefined) {
        query += "is_online = ?, ";
        queryValues.push(event.isOnline);
    }
    if (event.url !== undefined) {
        query += "url = ?, ";
        queryValues.push(event.url);
    }
    if (event.venue !== undefined) {
        query += "venue = ?, ";
        queryValues.push(event.venue);
    }
    if (event.capacity !== undefined) {
        query += "capacity = ?, ";
        queryValues.push(event.capacity);
    }
    if (event.requiresAttendanceControl !== undefined) {
        query += "requires_attendance_control = ?, ";
        queryValues.push(event.requiresAttendanceControl);
    }
    if (event.fee !== undefined) {
        query += "fee = ?, ";
        queryValues.push(event.fee);
    }
    if (event.categoryIds !== undefined) {
        await this.updateEventsCategories(eventId, event.categoryIds);
    }

    // Get rid of the last comma
    const lastComma = query.lastIndexOf(',');
    query = query.slice(0, lastComma) + query.slice(lastComma + 1);
    query += " WHERE id = ?";
    queryValues.push(eventId);

    await db.getPool().query(query, queryValues);
};

exports.deleteEventsCatergories = async function (eventId) {
    const query = `DELETE FROM event_category WHERE event_id = ?`;
    await db.getPool().query(query, [eventId]);
};

exports.deleteEvent = async function (eventId) {
    const query = `DELETE FROM event WHERE id = ?`;
    await db.getPool().query(query, [eventId]);
};

exports.getCategories = async function () {
    const query = 'SELECT id AS categoryId, name FROM category ORDER BY categoryId';
    const [categories] = await db.getPool().query(query, []);
    return categories;
};

exports.getCategories = async function () {
    const query = 'SELECT id AS categoryId, name FROM category ORDER BY categoryId';
    const [categories] = await db.getPool().query(query, []);
    return categories;
};