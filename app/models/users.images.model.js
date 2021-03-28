const db = require('../../config/db');
const fs = require('fs');
const imageLocation = './storage/images/';


/**
 * Save the passed in user image
 * @param image User image
 * @param mimeType The mime type of the image
 * @param userId the ID of the user
 * @returns {Promise<number>} The HTTP code to respond with
 */
exports.saveImage = async function (image, mimeType, userId) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
        return 400;
    }
    const fileType = mimeType.split('/')[1];
    const fileName = `user_${userId}`;

    // Check if their is an existing image for the user
    const savedImages = await fs.readdirSync(imageLocation);
    const existingImage = savedImages.find((file) => {
        return file.includes(fileName);
    });

    // Replace the existing image with the new image
    if (existingImage) {
        await deleteImage(existingImage, userId);
    }
    await fs.writeFileSync(imageLocation + `${fileName}.${fileType}`, image, function (error) {
        if (error) {
            return 400;
        }
    });

    // Save the filename in the database
    const query = 'UPDATE user SET image_filename = ? WHERE id = ?';
    await db.getPool().query(query, [`${fileName}.${fileType}`, userId]);

    return existingImage ? 200 : 201;
};

/**
 * Delete the image with the specified filename
 * @param file the filename to delete
 */
deleteImage = async function (file, userId) {
    // Delete the file
    await fs.unlinkSync(imageLocation + file);

    // Delete the filename in the database
    const query = 'UPDATE user SET image_filename = null WHERE id = ?';
    await db.getPool().query(query, [userId]);
};

/**
 * Method to get the image for the user
 * @param userId The id for the user
 * @returns {Promise<(any)[]|*[]>} An array of type [image, image mime type] (nulls if there is no image)
 */
exports.getImage = async function (userId) {
    // Check if their is an existing image for the user
    const savedImages = await fs.readdirSync(imageLocation);
    const fileName = savedImages.find((file) => {
        return file.includes(`user_${userId}`);
    });
    if (!fileName) {
        return [null, null];
    }

    const fileType = fileName.split('.').pop();
    const mimeDict = {
        png: 'image/png',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        gif: 'image/gif'
    };

    const mimeType = mimeDict[fileType];
    const image = await fs.readFileSync(imageLocation + fileName);
    return [image, mimeType];
};

/**
 * Method to delete the image for the user
 * @param userId The id for the user
 */
exports.removeImage = async function (userId) {
    const fileName = `user_${userId}`;
    // Check if their is an existing image for the user
    const savedImages = await fs.readdirSync(imageLocation);
    const existingImage = savedImages.find((file) => {
        return file.includes(fileName);
    });

    // Delete the existing image
    if (existingImage) {
        await deleteImage(existingImage, userId);
    }
};