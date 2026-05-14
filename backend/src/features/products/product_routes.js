import express from 'express';
import {
    newProduct,
    getAdminProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    deleteProductImage,
    getProductStats,
} from './product_controller.js';
import { protect, restrictTo } from '../auth/auth_middleware.js';
import { upload } from './product_upload.js';

const router = express.Router();

// ══════════════════════════════════════════════════════════════
//  PUBLIC  — no auth required
// ══════════════════════════════════════════════════════════════
router.get('/product/:id', getSingleProduct);

// ══════════════════════════════════════════════════════════════
//  ADMIN ONLY — all routes below require auth
// ══════════════════════════════════════════════════════════════
router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

// Products list + create
router.get('/admin/products', getAdminProducts);
router.get('/admin/products/stats', getProductStats);
router.post('/admin/product/new', newProduct);

// Single product CRUD
router
    .route('/admin/product/:id')
    .get(getSingleProduct)          // admin preview
    .put(updateProduct)
    .delete(deleteProduct);

// Image management
router.post(
    '/admin/product/:id/images',
    upload.array('images', 10),     // multer: max 10 images per upload
    uploadProductImages
);

router.delete(
    '/admin/product/:id/image/:imageId',
    deleteProductImage
);

export default router;
