const bcrypt = require('bcrypt');

/**
 * Hash a given password using bcypt
 * @param password Password to be hashed
 * @returns {Promise<>} Hashed password
 */
exports.hash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};