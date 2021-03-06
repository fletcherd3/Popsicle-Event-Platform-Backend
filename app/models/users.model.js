const db = require('../../config/db');

exports.registerUser = async function(firstName, lastName, email, password) {
    // TODO: Add password hashing
    const query = 'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    const [rows] = await db.getPool().query(query, [firstName, lastName, email, password]);

    // Return the ID of registered User
    return rows.insertId;
}

exports.isLoginValid = async function(email, password){
    // TODO: Add password hashing
    const query = 'SELECT password FROM user where email = ?';
    const [rows] = await db.getPool().query(query, [email]);

    if (rows.length > 0) {
        const storedPassword = rows[0].password;
        return (password === storedPassword);
    } else {
        return false;
    }
};

exports.setUserToken = async function(userToken, email){
    const query = 'UPDATE user set auth_token = ? WHERE email = ?';
    await db.getPool().query(query, [userToken, email]);
};

exports.getUserId = async function(email){
    const query = 'SELECT id FROM user WHERE email = ? ';
    const [rows] = await db.getPool().query(query, [email]);
    return rows[0].id;
};