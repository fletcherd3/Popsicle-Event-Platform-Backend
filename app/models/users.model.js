const db = require('../../config/db');
const passwords = require('./passwords');
const bcrypt = require('bcrypt');

exports.registerUser = async function(firstName, lastName, email, password) {
    // Hash Password
    password = await passwords.hash(password);

    const query = 'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    const [rows] = await db.getPool().query(query, [firstName, lastName, email, password]);

    // Return the ID of registered User
    return rows.insertId;
};

exports.isLoginValid = async function(email, password) {
    const query = 'SELECT password FROM user where email = ?';
    const [rows] = await db.getPool().query(query, [email]);

    if (rows.length > 0) {
        const storedHash = rows[0].password;
        const validMatch = await bcrypt.compare(password, storedHash);
        return validMatch;
    }
    // No User found with matching email
    return false;
};

exports.setUserToken = async function(userToken, email) {
    const query = 'UPDATE user set auth_token = ? WHERE email = ?';
    await db.getPool().query(query, [userToken, email]);
};

exports.getUserIdByEmail = async function(email) {
    const query = 'SELECT id FROM user WHERE email = ? ';
    const [rows] = await db.getPool().query(query, [email]);
    return rows[0].id;
};

exports.getUserIdByToken = async function(userToken){
    const query = 'SELECT id FROM user WHERE auth_token = ? ';
    const [rows] = await db.getPool().query(query, [userToken]);
    return rows[0].id;
};

exports.isEmailInDb = async function(email) {
    const query = 'SELECT id FROM user WHERE email = ? ';
    const [rows] = await db.getPool().query(query, [email]);
    return rows.length > 0;
};

exports.isTokenInDb = async function(userToken) {
    const query = 'SELECT id FROM user WHERE auth_token = ? ';
    const [rows] = await db.getPool().query(query, [userToken]);
    return rows.length > 0;
};

exports.deleteToken = async function(userToken) {
    const query = 'UPDATE user SET auth_token = null WHERE auth_token = ? ';
    await db.getPool().query(query, [userToken]);
};

exports.getAuthUser = async function(userId) {
    const query = 'SELECT first_name, last_name, email FROM user WHERE id = ? ';
    const [rows] = await db.getPool().query(query, [userId]);
    return rows[0];
};

exports.getNonAuthUser = async function(userId) {
    const query = 'SELECT first_name, last_name FROM user WHERE id = ? ';
    const [rows] = await db.getPool().query(query, [userId]);
    return rows[0];
};

exports.isUserInDb = async function(userId) {
    const query = 'SELECT id FROM user WHERE id = ? ';
    const [rows] = await db.getPool().query(query, [userId]);
    return rows.length > 0;
};

exports.isCurrentPasswordValid = async function(userId, currentPassword) {
    const query = 'SELECT password FROM user WHERE id = ?';
    const [rows] = await db.getPool().query(query, [userId]);

    if (rows.length > 0) {
        const storedHash = rows[0].password;
        const validMatch = await bcrypt.compare(currentPassword, storedHash);
        return validMatch;
    }
    // No User found with matching id
    return false;
};

exports.updateUser = async function(id, firstName, lastName, email, newPassword) {
    let queryValues = []
    let query = 'UPDATE user SET ';

    if (firstName != undefined) {
        query += "first_name = ?, ";
        queryValues.push(firstName);
    }
    if (lastName != undefined) {
        query += "last_name = ?, ";
        queryValues.push(lastName);
    }
    if (email != undefined) {
        query += "email = ?, ";
        queryValues.push(email);
    }
    if (newPassword != undefined) {
        newPassword = await passwords.hash(newPassword);
        query += "password = ?, ";
        queryValues.push(newPassword);
    }
    // Get rid of the last comma
    const lastComma = query.lastIndexOf(',');
    query = query.slice(0, lastComma) + query.slice(lastComma+1);
    query += " WHERE id = ?";
    queryValues.push(id);

    await db.getPool().query(query, queryValues);
};

