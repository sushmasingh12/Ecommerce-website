import axios from 'axios';
import Product from './product_model.js';
import { uploadToCloudinary } from './product_upload.js';

const DEFAULT_PER_PAGE = 10;

// ══════════════════════════════════════════════════════════════
//  CREATE
// ══════════════════════════════════════════════════════════════
export const createProduct = async (productData, userId) => {
    productData.user = userId;

    // Auto-generate SEO URL from title if not provided
    if (!productData.seoUrl && productData.title) {
        productData.seoUrl = productData.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    const product = await Product.create(productData);
    return product;
};

// ══════════════════════════════════════════════════════════════
//  READ — LIST with search / filter / sort / pagination
// ══════════════════════════════════════════════════════════════
export const getProducts = async (queryStr = {}) => {
    const {
        keyword,
        category,
        subcategory,
        status,
        minPrice,
        maxPrice,
        sort = '-createdAt',
        page = 1,
        limit = DEFAULT_PER_PAGE,
    } = queryStr;

    // ── Build filter ─────────────────────────────────────────
    const filter = {};

    if (keyword) {
        filter.$or = [
            { $text: { $search: keyword } },           // full-text index
            { title: { $regex: keyword, $options: 'i' } },
            { sku: { $regex: keyword, $options: 'i' } },
            { tags: { $regex: keyword, $options: 'i' } },
        ];
    }

    if (category && category !== 'All') {
        filter.category = category.toLowerCase();
    }

    if (subcategory) {
        filter.subcategory = subcategory;
    }

    if (status && status !== 'All') {
        filter.status = status;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.basePrice = {};
        if (minPrice !== undefined) filter.basePrice.$gte = Number(minPrice);
        if (maxPrice !== undefined) filter.basePrice.$lte = Number(maxPrice);
    }

    // ── Pagination ───────────────────────────────────────────
    const skip = (Number(page) - 1) * Number(limit);
    const productsCount = await Product.countDocuments(filter);

    // ── Query ─────────────────────────────────────────────────
    const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .select('-reviews');   // reviews are fetched separately

    return {
        products,
        productsCount,
        page: Number(page),
        perPage: Number(limit),
        totalPages: Math.ceil(productsCount / Number(limit)),
    };
};

// ══════════════════════════════════════════════════════════════
//  READ — SINGLE
// ══════════════════════════════════════════════════════════════
export const getProductById = async (id) => {
    const product = await Product.findById(id).populate('reviews.user', 'name');
    if (!product) throw new Error('Product not found');
    return product;
};

// ══════════════════════════════════════════════════════════════
//  UPDATE
// ══════════════════════════════════════════════════════════════
export const updateProduct = async (id, updateData) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    // Protect fields that should not be updated via bulk update
    const disallowed = ['user', '_id', 'reviews', 'ratings', 'numOfReviews'];
    disallowed.forEach((k) => delete updateData[k]);

    // Regenerate SEO URL if title changed and no explicit seoUrl given
    if (updateData.title && !updateData.seoUrl) {
        updateData.seoUrl = updateData.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    return updated;
};

// ══════════════════════════════════════════════════════════════
//  ADD IMAGES (Cloudinary URLs pushed to product.images)
// ══════════════════════════════════════════════════════════════
export const addProductImages = async (id, imageObjects) => {
    // imageObjects: [{ public_id, url }, ...]
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (product.images.length + imageObjects.length > 10) {
        throw new Error('A product can have at most 10 images');
    }

    product.images.push(...imageObjects);
    await product.save();
    return product;
};

// ══════════════════════════════════════════════════════════════
//  DELETE IMAGE
// ══════════════════════════════════════════════════════════════
export const deleteProductImage = async (productId, imageId) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const img = product.images.id(imageId);
    if (!img) throw new Error('Image not found');

    // Caller should delete from Cloudinary before calling this
    product.images.pull(imageId);
    await product.save();
    return product;
};

// ══════════════════════════════════════════════════════════════
//  DELETE PRODUCT
// ══════════════════════════════════════════════════════════════
export const deleteProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    // TODO: delete associated Cloudinary images here before removing from DB
    // await Promise.all(product.images.map(img => cloudinary.uploader.destroy(img.public_id)));

    await product.deleteOne();
    return true;
};

// ══════════════════════════════════════════════════════════════
//  QUICK STATS  (for admin dashboard widget)
// ══════════════════════════════════════════════════════════════
export const getQuickStats = async () => {
    const [totalActive, lowStock, ratingResult] = await Promise.all([
        Product.countDocuments({ status: 'Active' }),
        Product.countDocuments({ stock: { $gt: 0, $lte: 10 } }),
        Product.aggregate([
            { $match: { numOfReviews: { $gt: 0 } } },
            { $group: { _id: null, avg: { $avg: '$ratings' } } },
        ]),
    ]);

    return {
        totalActive,
        lowStock,
        avgRating: ratingResult[0]?.avg?.toFixed(1) ?? '—',
    };
};

// ══════════════════════════════════════════════════════════════
//  BULK CREATE
// ══════════════════════════════════════════════════════════════
export const bulkCreateProducts = async (productsArray, userId, imagesMap = {}) => {
    // Process each product data
    const processedProducts = [];

    for (const p of productsArray) {
        const data = { ...p };
        data.user = userId;

        // Auto-generate SEO URL from title if not provided
        if (!data.seoUrl && data.title) {
            data.seoUrl = data.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
        }

        // Handle array fields if they are strings (comma separated)
        ['colors', 'sizes', 'materials', 'tags', 'highlights'].forEach(field => {
            if (typeof data[field] === 'string') {
                data[field] = data[field].split(',').map(s => s.trim()).filter(s => s !== '');
            }
        });

        // Handle images if provided as URLs or filenames (ZIP)
        if (typeof data.images === 'string' && data.images.trim() !== '') {
            const identifiers = data.images.split(',').map(item => item.trim()).filter(item => item !== '');
            const uploadedImages = [];

            for (const id of identifiers) {
                try {
                    let buffer;
                    let result;

                    // 1. Check if it's a local file in imagesMap
                    if (imagesMap[id]) {
                        buffer = imagesMap[id];
                        result = await uploadToCloudinary(buffer, { folder: 'bazario/bulk' });
                    } 
                    // 2. Otherwise treat as URL
                    else if (id.startsWith('http')) {
                        const response = await axios.get(id, { responseType: 'arraybuffer' });
                        buffer = Buffer.from(response.data, 'binary');
                        result = await uploadToCloudinary(buffer, { folder: 'bazario/bulk' });
                    }

                    if (result) {
                        uploadedImages.push({
                            public_id: result.public_id,
                            url: result.secure_url
                        });
                    }
                } catch (error) {
                    console.error(`Bulk Upload: Failed to upload image ${id}`, error.message);
                }
            }
            data.images = uploadedImages;
        }

        // Handle numeric fields
        ['basePrice', 'discount', 'stock'].forEach(field => {
            if (data[field] !== undefined && data[field] !== '') {
                data[field] = Number(data[field]);
            }
        });

        processedProducts.push(data);
    }

    // Use insertMany for efficiency
    const products = await Product.insertMany(processedProducts, { ordered: false });
    return products;
};
