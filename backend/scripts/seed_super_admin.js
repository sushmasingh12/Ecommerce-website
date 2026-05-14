import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../src/features/auth/admin_model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');

        const email = 'superadmin@ecommerce.com';
        const existing = await Admin.findOne({ email });

        if (existing) {
            console.log('Super Admin already exists.');
            process.exit(0);
        }

        await Admin.create({
            name: 'System Super Admin',
            email: email,
            phone: '9999999999',
            password: 'superpassword123', // User should change this after first login
            role: 'super_admin',
            status: 'active',
            isVerified: true,
        });

        console.log('Super Admin created successfully!');
        console.log('Email: superadmin@ecommerce.com');
        console.log('Password: superpassword123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding super admin:', error.message);
        process.exit(1);
    }
};

seedSuperAdmin();
