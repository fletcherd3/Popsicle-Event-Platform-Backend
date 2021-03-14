const db = require('../../config/db');

exports.isCatergoryInDb = async function(categoryId) {
    const query = 'SELECT id FROM event WHERE id = ?';
    const [rows] = await db.getPool().query(query, [categoryId]);

    return rows.length > 0;
};

exports.getEvents = async function(queryTerm, categoryIds, organizerId, sortQuery) {
    let queryValues = [];
    let query = `SELECT E.id AS eventId, E.title, U.first_name AS organizerFirstName, U.last_name AS organizerLastName, count(A.id) AS numAcceptedAttendees, E.capacity
                   FROM event E
                   JOIN user U ON E.organizer_id = U.id
                   JOIN event_attendees A ON A.event_id = E.id
                   WHERE attendance_status_id = 1`;

    if(queryTerm != undefined){
        query += ` AND E.title LIKE ?`;
        queryValues.push("%" + queryTerm + "%");
    }

    // if(categoryIds != undefined){
    //     query += 'AND c.category_id = ? ';
    //     queryValues.push(categoryId);
    // }

    if(organizerId != undefined){
        query+= ' AND E.organizer_id = ?';
        queryValues.push(organizerId);
    }

    query += ' GROUP BY E.id ';
    query += sortQuery;
    const [rows] = await db.getPool().query(query, queryValues)

    return rows;
};