const db = require('../../config/db');
const fecha = require('fecha');


exports.getAuthdEventsAttendees = async function (eventId) {
    query = `SELECT A.user_id AS attendeeId, S.name AS status, U.first_name AS firstName, U.last_name AS lastName, A.date_of_interest AS dateOfInterest
             FROM event_attendees A
             JOIN attendance_status S ON A.attendance_status_id = S.id
             JOIN user U ON A.user_id = U.id
             WHERE event_id = ?`;
    const [result] = await db.getPool().query(query, [eventId]);
    return result;
};

exports.getNonAuthdEventsAttendees = async function (eventId, userId) {
    query = `SELECT A.user_id AS attendeeId, S.name AS status, U.first_name AS firstName, U.last_name AS lastName, A.date_of_interest AS dateOfInterest
             FROM event_attendees A
             JOIN attendance_status S ON A.attendance_status_id = S.id
             JOIN user U ON A.user_id = U.id
             WHERE event_id = ? AND (S.name = 'accepted' OR A.user_id = ?)
             ORDER BY dateOfInterest`;
    const [result] = await db.getPool().query(query, [eventId, userId]);
    return result;
};

exports.hasUserJoinedEvent = async function (eventId, userId) {
    query = `SELECT * FROM event_attendees WHERE event_id = ? AND user_id = ?`;
    const [result] = await db.getPool().query(query, [eventId, userId]);
    return result.length > 0;
};

exports.isEventInPast = async function (eventId) {
    query = `SELECT date FROM event WHERE id = ?`;
    const [result] = await db.getPool().query(query, [eventId]);
    const eventsDate = new Date(result[0].date);

    return eventsDate < Date.now();
};

exports.requestAttendance = async function (eventId, userId) {
    const pendingId = 2;
    query = `INSERT INTO event_attendees (event_id, user_id, attendance_status_id, date_of_interest)
             VALUES (?, ?, ?, SYSDATE())`;
    await db.getPool().query(query, [eventId, userId, pendingId]);
};