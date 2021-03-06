const db = require('../../config/db');

exports.registerUser = async function(firstName, lastName, email, password) {
    const query = 'insert into user (first_name, last_name, email, password) values (?, ?, ?, ?)';
    const [rows] = await db.getPool().query(query, [firstName, lastName, email, password]);
    // Return the ID of registered User
    return rows.insertId;
}