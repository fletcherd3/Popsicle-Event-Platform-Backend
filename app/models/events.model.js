const db = require('../../config/db');

exports.isCatergoryInDb = async function(categoryId) {
    const query = 'SELECT id FROM category WHERE id = ?';
    const [rows] = await db.getPool().query(query, [categoryId]);
    return rows.length > 0;
};

exports.getEvents = async function(queryTerm, categoryIds, organizerId, sortQuery) {
    let queryValues = [];
    let query = `SELECT E.id AS eventId, E.title, U.first_name AS organizerFirstName, U.last_name AS organizerLastName, count(A.id) AS numAcceptedAttendees, E.capacity
                 FROM event E
                  JOIN user U ON E.organizer_id = U.id
                  JOIN event_attendees A ON A.event_id = E.id
                  JOIN event_category C ON E.id = C.event_id
                 WHERE attendance_status_id = 1`;

    if(queryTerm != undefined){
        query += ` AND (E.title LIKE ? OR E.description LIKE ?)`;
        queryValues.push("%" + queryTerm + "%", "%" + queryTerm + "%");
    }

    if(categoryIds != undefined){
        query += ' AND C.category_id IN (?)';
        queryValues.push(categoryIds);
    }

    if(organizerId != undefined){
        query+= ' AND E.organizer_id = ?';
        queryValues.push(organizerId);
    }

    query += ' GROUP BY E.id, category_id, E.title, organizerFirstName, organizerLastName, E.capacity ';
    query += sortQuery;
    const [events] = await db.getPool().query(query, queryValues);

    // Get the categories for each event and format them into an array
    query = 'SELECT category_id FROM event_category WHERE event_id = ?';
    for (let i = 0; i < events.length; i++) {
        let categoriesResult = await db.getPool().query(query, [events[i].eventId]);
        categoriesResult = categoriesResult[0];
        let eventsCategories = [];
        for (let j = 0; j < categoriesResult.length; j++) {
            eventsCategories.push(categoriesResult[j].category_id);
        }
        events[i].categories = eventsCategories;
    }

    return events;
};