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

    if (!mimeType || !allowedMimeTypes.includes(mimeType)){
        return 400;
    }
    const fileType = mimeType.split('/')[1];
    const fileName = `user-${userId}`;

    // Check if their is an existing image for the user
    const savedImages = await fs.readdirSync(imageLocation);
    const existingImage = savedImages.find((file) => {
        // return the first files that include given entry
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

    return existingImage ? 200 : 201;
};

/**
 * Delete the image with the specified filename
 * @param file the filename to delete
 */
deleteImage = async function (file) {
    await fs.unlinkSync(imageLocation + file);
};

// /**
//  * Method to get the image for the event
//  * @param eventId The id for the event
//  * @returns {Promise<(any)[]|*[]>} An array of type [image, image mime type] (nulls if there is no image)
//  */
// exports.getImage = async function (eventId) {
//     // Check if their is an existing image for the event
//     const savedImages = await fs.readdirSync(imageLocation);
//     const fileName = savedImages.find((file) => {
//         // return the first files that include given entry
//         return file.includes(`event-${eventId}`);
//     });
//     if (!fileName) {
//         return [null, null];
//     }
//
//     const fileType = fileName.split('.').pop();
//     const mimeDict = {
//         png: 'image/png',
//         jpeg: 'image/jpeg',
//         gif: 'image/gif'
//     };
//
//     const mimeType = mimeDict[fileType];
//     const image = await fs.readFileSync(imageLocation + fileName);
//     return [image, mimeType];
// };
//
