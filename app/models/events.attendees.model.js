const db = require('../../config/db');


exports.getAuthdEventsAttendees = async function (eventId) {
    const query = `SELECT A.user_id AS attendeeId, S.name AS status, U.first_name AS firstName, U.last_name AS lastName, A.date_of_interest AS dateOfInterest
             FROM event_attendees A
             JOIN attendance_status S ON A.attendance_status_id = S.id
             JOIN user U ON A.user_id = U.id
             WHERE event_id = ?`;
    const [result] = await db.getPool().query(query, [eventId]);
    return result;
};

exports.getNonAuthdEventsAttendees = async function (eventId, userId) {
    const query = `SELECT A.user_id AS attendeeId, S.name AS status, U.first_name AS firstName, U.last_name AS lastName, A.date_of_interest AS dateOfInterest
             FROM event_attendees A
             JOIN attendance_status S ON A.attendance_status_id = S.id
             JOIN user U ON A.user_id = U.id
             WHERE event_id = ? AND (S.name = 'accepted' OR A.user_id = ?)
             ORDER BY dateOfInterest`;
    const [result] = await db.getPool().query(query, [eventId, userId]);
    return result;
};

exports.hasUserJoinedEvent = async function (eventId, userId) {
    const query = `SELECT * FROM event_attendees WHERE event_id = ? AND user_id = ?`;
    const [result] = await db.getPool().query(query, [eventId, userId]);
    return result.length > 0;
};

exports.isEventInPast = async function (eventId) {
    const query = `SELECT date FROM event WHERE id = ?`;
    const [result] = await db.getPool().query(query, [eventId]);
    const eventsDate = new Date(result[0].date);

    return eventsDate < Date.now();
};

exports.requestAttendance = async function (eventId, userId) {
    const pendingId = 2;
    const query = `INSERT INTO event_attendees (event_id, user_id, attendance_status_id, date_of_interest)
             VALUES (?, ?, ?, SYSDATE())`;
    await db.getPool().query(query, [eventId, userId, pendingId]);
};

exports.isUserIsRejected = async function (eventId, userId) {
    const rejectedId = 3;
    const query = `SELECT id
             FROM event_attendees
             WHERE user_id = ? AND event_id = ? AND attendance_status_id = ?`;
    const [result] = await db.getPool().query(query, [userId, eventId, rejectedId]);
    return result.length > 0;
};

exports.removeAttendance = async function (eventId, userId) {
    const query = `DELETE FROM event_attendees
             WHERE user_id = ? AND event_id = ?`;
    await db.getPool().query(query, [userId, eventId]);
};

exports.updateAttendance = async function (userId, eventId, status) {
    const query = `UPDATE event_attendees
                   SET attendance_status_id = ?
                   WHERE user_id = ? AND event_id = ?`;
    await db.getPool().query(query, [status, userId, eventId]);
};

exports.isUserAttendingEvent = async function (userId, eventId) {
    const query = `UPDATE event_attendees
                   SET attendance_status_id = ?
                   WHERE user_id = ? AND event_id = ?`;
    await db.getPool().query(query, [status, userId, eventId]);
};