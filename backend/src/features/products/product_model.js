import mongoose from 'mongoose';

// ── Bazario category tree ──────────────────────────────────────
// Must mirror navigationData.js in the bazario frontend
const CATEGORIES = ['men', 'women', 'accessories', 'footwear', 'collections', 'new-arrivals'];
const SUBCATEGORIES = [
    // men
    'Shirts', 'T-shirts', 'Pant & Joggers', 'Trouser',
    // women
    'Dresses & Skirts', 'Top', 'T-Shirt', 'Bottomwear',
    // accessories
    'Bags', 'Watches', 'Jewellery',
    // footwear
    'Men Footwear', 'Women Footwear',
];

const productSchema = new mongoose.Schema(
    {
        // ── Core Info ─────────────────────────────────────────────
        title: {
            type: String,
            required: [true, 'Please enter product title'],
            trim: true,
            maxLength: [200, 'Product title cannot exceed 200 characters'],
        },
        subdesc: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },

        // ── Pricing & Identity ─────────────────────────────────────
        basePrice: {
            type: Number,
            required: [true, 'Please enter product price'],
            min: [0, 'Price cannot be negative'],
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        currency: {
            type: String,
            default: 'INR',
        },
        badge: {
            type: String,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['Men', 'Women', 'Unisex', 'Kids'],
            default: 'Unisex',
        },

        // ── Inventory ─────────────────────────────────────────────
        sku: {
            type: String,
            required: [true, 'Please enter product SKU'],
            unique: true,
            trim: true,
            uppercase: true,
        },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            default: 0,
            min: [0, 'Stock cannot be negative'],
        },

        // ── Categorisation ────────────────────────────────────────
        category: {
            type: String,
            required: [true, 'Please select category'],
            enum: {
                values: CATEGORIES,
                message: `Category must be one of: ${CATEGORIES.join(', ')}`,
            },
            lowercase: true,
        },
        subcategory: {
            type: String,
            enum: {
                values: [...SUBCATEGORIES, ''],
                message: `Invalid subcategory`,
            },
            default: '',
        },

        // ── Product Details & Specifications ──────────────────────
        highlights: [{ type: String, trim: true }],
        specifications: {
            fit: String,
            fabric: String,
            origin: String,
        },
        composition: {
            outer: String,
            lining: String,
            care: String,
        },
        shippingDetails: {
            delivery: String,
            returns: String,
            warranty: String,
        },
        artisanNote: String,

        // ── Status ────────────────────────────────────────────────
        status: {
            type: String,
            enum: ['Active', 'Draft', 'Archived'],
            default: 'Active',
        },

        // ── Variants ──────────────────────────────────────────────
        colors: [{ type: String, trim: true }],
        sizes: [{ type: String, trim: true }],
        materials: [{ type: String, trim: true }],
        tags: [{ type: String, trim: true, uppercase: true }],

        // ── Media (Cloudinary) ────────────────────────────────────
        images: [
            {
                public_id: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],

        // ── SEO ───────────────────────────────────────────────────
        seoTitle: { type: String, maxLength: 70 },
        seoUrl: { type: String, lowercase: true },
        seoDescription: { type: String, maxLength: 200 },

        // ── Ratings / Reviews ─────────────────────────────────────
        ratings: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        ratingBreakdown: {
            5: { type: Number, default: 0 },
            4: { type: Number, default: 0 },
            3: { type: Number, default: 0 },
            2: { type: Number, default: 0 },
            1: { type: Number, default: 0 },
        },
        reviews: [
            {
                user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
                name: String,
                rating: { type: Number, required: true, min: 1, max: 5 },
                comment: String,
                date: { type: Date, default: Date.now },
            },
        ],

        // ── Ownership ─────────────────────────────────────────────
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Admin',
            required: true,
        },
    },
    { timestamps: true }
);

// ── Indexes ────────────────────────────────────────────────────
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, status: 1 });

// ── Virtual: sellingPrice ──────────────────────────────────────
productSchema.virtual('sellingPrice').get(function () {
    return Math.round(this.basePrice * (1 - this.discount / 100));
});

// ── Virtual: stockStatus ───────────────────────────────────────
productSchema.virtual('stockStatus').get(function () {
    if (this.stock > 10) return 'IN STOCK';
    if (this.stock > 0) return 'LOW STOCK';
    return 'OUT OF STOCK';
});

const Product = mongoose.model('Product', productSchema);

export default Product;
