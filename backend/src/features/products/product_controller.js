import * as productService from './product_service.js';
import { uploadToCloudinary, deleteFromCloudinary } from './product_upload.js';

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
