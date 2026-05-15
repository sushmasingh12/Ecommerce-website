import * as productService from './product_service.js';
import { uploadToCloudinary, deleteFromCloudinary } from './product_upload.js';
import { parseCSV, parseExcel } from '../../utils/file_parser.js';
import AdmZip from 'adm-zip';
import path from 'path';

// ══════════════════════════════════════════════════════════════
//  POST /admin/product/new
// ══════════════════════════════════════════════════════════════
export const newProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body, req.user.id);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  GET /admin/products?keyword=&category=&status=&page=&limit=
// ══════════════════════════════════════════════════════════════
export const getAdminProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req.query);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  GET /product/:id  (public)
// ══════════════════════════════════════════════════════════════
export const getSingleProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  PUT /admin/product/:id
// ══════════════════════════════════════════════════════════════
export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  POST /admin/product/:id/images
//  Accepts multipart/form-data with field name "images" (multiple)
// ══════════════════════════════════════════════════════════════
export const uploadProductImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No images provided' });
        }

        // Upload each file to Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map((file) =>
                uploadToCloudinary(file.buffer, {
                    folder: 'bazario/products',
                    resource_type: 'image',
                })
            )
        );

        const imageObjects = uploadedImages.map(({ public_id, secure_url }) => ({
            public_id,
            url: secure_url,
        }));

        const product = await productService.addProductImages(req.params.id, imageObjects);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  DELETE /admin/product/:id/image/:imageId
// ══════════════════════════════════════════════════════════════
export const deleteProductImage = async (req, res) => {
    try {
        const { id: productId, imageId } = req.params;

        // Find the image's public_id first so we can remove from Cloudinary
        const { getProductById } = productService;
        const product = await getProductById(productId);
        const img = product.images.id(imageId);
        if (!img) return res.status(404).json({ success: false, message: 'Image not found' });

        // Delete from Cloudinary
        await deleteFromCloudinary(img.public_id);

        // Delete from DB
        const updated = await productService.deleteProductImage(productId, imageId);
        res.status(200).json({ success: true, product: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  DELETE /admin/product/:id
// ══════════════════════════════════════════════════════════════
export const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  GET /admin/products/stats  (for QuickStatsCard)
// ══════════════════════════════════════════════════════════════
export const getProductStats = async (req, res) => {
    try {
        const stats = await productService.getQuickStats();
        res.status(200).json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// ══════════════════════════════════════════════════════════════
//  POST /admin/products/bulk-upload
// ══════════════════════════════════════════════════════════════
export const bulkUploadProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        let products = [];
        let imagesMap = {}; // filename -> buffer
        const mimetype = req.file.mimetype;

        if (mimetype === 'application/zip' || mimetype === 'application/x-zip-compressed') {
            const zip = new AdmZip(req.file.buffer);
            const zipEntries = zip.getEntries();

            // 1. Find the CSV/Excel file
            const dataFileEntry = zipEntries.find(entry => 
                ['.csv', '.xlsx', '.xls'].includes(path.extname(entry.entryName).toLowerCase())
            );

            if (!dataFileEntry) {
                return res.status(400).json({ success: false, message: 'No CSV or Excel file found in ZIP' });
            }

            const dataBuffer = dataFileEntry.getData();
            const ext = path.extname(dataFileEntry.entryName).toLowerCase();

            if (ext === '.csv') products = await parseCSV(dataBuffer);
            else products = parseExcel(dataBuffer);

            // 2. Map images
            zipEntries.forEach(entry => {
                const entryExt = path.extname(entry.entryName).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(entryExt)) {
                    const filename = path.basename(entry.entryName);
                    imagesMap[filename] = entry.getData();
                }
            });

        } else if (mimetype === 'text/csv') {
            products = await parseCSV(req.file.buffer);
        } else if (
            mimetype === 'application/vnd.ms-excel' ||
            mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            products = parseExcel(req.file.buffer);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid file format. Use CSV, Excel, or ZIP.' });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({ success: false, message: 'File is empty' });
        }

        const result = await productService.bulkCreateProducts(products, req.user.id, imagesMap);
        res.status(201).json({
            success: true,
            message: `${result.length} products added successfully`,
            count: result.length
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ══════════════════════════════════════════════════════════════
//  POST /admin/product/:id/image-url
// ══════════════════════════════════════════════════════════════
export const uploadProductImageByURL = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: 'No URL provided' });

        const axios = (await import('axios')).default; // Import axios dynamically if needed or use global
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const { uploadToCloudinary } = await import('./product_upload.js');
        const result = await uploadToCloudinary(buffer);

        const imageObject = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        const product = await productService.addProductImages(req.params.id, [imageObject]);
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
