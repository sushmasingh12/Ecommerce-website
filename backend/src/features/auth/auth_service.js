import Admin from './admin_model.js';
import jwt from 'jsonwebtoken';

// ─── Admin Management ─────────────────────────────────────────────────────────

/**
 * createAdmin
 * Used by super_admin to create new admins.
 */
export const createAdmin = async (adminData, creatorId) => {
    const { name, email, phone, password, role } = adminData;

    const existing = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
        if (existing.email === email) throw new Error('Admin with this email already exists.');
        throw new Error('Admin with this phone number already exists.');
    }

    const admin = await Admin.create({
        name,
        email,
        phone,
        password,
        role,
        createdBy: creatorId,
        isVerified: true, // Internal admins are verified by default
    });

    return admin;
};

/**
 * getAllAdmins
 */
export const getAllAdmins = async (filters = {}, options = {}) => {
    const { role, status, search } = filters;
    const query = {};

    if (role) query.role = role;
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }

    const admins = await Admin.find(query)
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name email');

    return admins;
};

/**
 * getAdminById
 */
export const getAdminById = async (id) => {
    const admin = await Admin.findById(id).populate('createdBy', 'name email');
    if (!admin) throw new Error('Admin not found.');
    return admin;
};

/**
 * updateAdmin
 */
export const updateAdmin = async (id, updateData) => {
    const admin = await Admin.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!admin) throw new Error('Admin not found.');
    return admin;
};

/**
 * deleteAdmin
 */
export const deleteAdmin = async (id, requesterId) => {
    if (id === requesterId.toString()) {
        throw new Error('You cannot delete yourself.');
    }

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) throw new Error('Admin not found.');
    return admin;
};

/**
 * toggleAdminStatus
 */
export const toggleAdminStatus = async (id, requesterId) => {
    if (id === requesterId.toString()) {
        throw new Error('You cannot deactivate yourself.');
    }

    const admin = await Admin.findById(id);
    if (!admin) throw new Error('Admin not found.');

    admin.status = admin.status === 'active' ? 'inactive' : 'active';
    await admin.save();
    return admin;
};

// ─── Authentication ───────────────────────────────────────────────────────────

/**
 * loginAdmin
 */
export const loginAdmin = async (email, password) => {
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) throw new Error('Invalid credentials.');
    if (admin.status === 'inactive') throw new Error('Your account is deactivated. Contact super admin.');

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) throw new Error('Invalid credentials.');

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    return admin;
};

// ─── JWT ──────────────────────────────────────────────────────────────────────
export const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
