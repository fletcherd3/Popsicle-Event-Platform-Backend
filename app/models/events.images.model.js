const db = require('../../config/db');
const fs = require('fs');
const imageLocation = './storage/images/';


/**
 * Save the passed in event image
 * @param image event image
 * @param mimeType the mime type of the image
 * @param eventId the ID of the event ID
 * @returns {Promise<number>} The HTTP code to respond with
 */
exports.saveImage = async function (image, mimeType, eventId) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
        return 400;
    }
    const fileType = mimeType.split('/')[1];
    const fileName = `event_${eventId}`;

    // Get the filename if there is an existing image for the event
    const savedImages = await fs.readdirSync(imageLocation);
    const existingImage = savedImages.find((file) => {
        return file.includes(fileName);
    });

    // Replace the existing image with the new image
    if (existingImage) {
        await deleteImage(existingImage);
    }
    await fs.writeFileSync(imageLocation + `${fileName}.${fileType}`, image, function (error) {
        if (error) {
            return 400;
        }
    });

    // Save the filename in the database
    const query = 'UPDATE event SET image_filename = ? WHERE id = ?';
    await db.getPool().query(query, [`${fileName}.${fileType}`, eventId]);

    return existingImage ? 200 : 201;
};

/**
 * Delete the image with the specified filename
 * @param file the filename to delete
 */
deleteImage = async function (file) {
    await fs.unlinkSync(imageLocation + file);
};

/**
 * Method to get the image for the event
 * @param eventId The id for the event
 * @returns {Promise<(any)[]|*[]>} An array of type [image, image mime type] (nulls if there is no image)
 */
exports.getImage = async function (eventId) {
    // Check if their is an existing image for the event
    const savedImages = await fs.readdirSync(imageLocation);
    const fileName = savedImages.find((file) => {
        return file.includes(`event_${eventId}`);
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

