/**
 * product_upload.js
 * ─────────────────
 * Multer configuration (memory storage) + Cloudinary helpers.
 *
 * Install once:
 *   npm install multer cloudinary
 *
 * Required env vars (add to .env):
 *   CLOUDINARY_CLOUD_NAME=your_cloud
 *   CLOUDINARY_API_KEY=your_key
 *   CLOUDINARY_API_SECRET=your_secret
 */

import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// ── Cloudinary config ─────────────────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer — keep files in memory as Buffer ───────────────────
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, WEBP, or GIF images are allowed'), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB per file
        files: 10,                  // max 10 files per request
    },
});

// ── Upload a Buffer to Cloudinary ─────────────────────────────
// product_upload.js

export const uploadToCloudinary = (buffer, options = {}) => {
    // Config har baar function call pe — env vars guaranteed milenge
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'bazario/products',
                ...options,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        const readable = new Readable();
        readable.push(buffer);
        readable.push(null);
        readable.pipe(uploadStream);
    });
};

// ── Delete an asset from Cloudinary by public_id ─────────────
export const deleteFromCloudinary = (publicId) =>
    cloudinary.uploader.destroy(publicId);

export default cloudinary;
