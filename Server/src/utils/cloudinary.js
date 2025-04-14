import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            console.error('No file path provided');
            return null;
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File does not exist at path:', filePath);
            return null;
        }

        console.log('Attempting to upload file:', filePath);
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });

        console.log("Upload successful:", uploadResult.url);

        // Delete the local file after successful upload
        // fs.unlinkSync(filePath);
        return uploadResult;
    }
    catch (err) {
        console.error('Cloudinary upload error:', err);

        // Try to delete the local file even if upload failed
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log('Local file deleted after failed upload');
            }
        } catch (unlinkErr) {
            console.error('Error deleting local file:', unlinkErr);
        }

        return null;
    }
}

export { uploadOnCloudinary };