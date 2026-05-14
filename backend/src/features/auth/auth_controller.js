import * as authService from './auth_service.js';

// ─── Cookie Config ────────────────────────────────────────────────────────────
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

const setTokenCookie = (res, token) => {
    res.cookie('adminToken', token, COOKIE_OPTIONS);
};

const clearTokenCookie = (res) => {
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
};

// ─── Authentication Controllers ───────────────────────────────────────────────

/**
 * signin
 * Public endpoint for admin login.
 */
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await authService.loginAdmin(email, password);
        const token = authService.generateToken(admin._id);

        setTokenCookie(res, token);

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                status: admin.status,
                avatar: admin.avatar,
            },
        });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

/**
 * signout
 */
export const signout = (_req, res) => {
    clearTokenCookie(res);
    res.status(200).json({ success: true, message: 'Signed out successfully.' });
};

/**
 * getMe
 * Returns current logged in admin info.
 */
export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        admin: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            status: req.user.status,
            avatar: req.user.avatar,
        },
    });
};

// ─── Admin Management Controllers (Super Admin Only) ──────────────────────────

/**
 * createNewAdmin
 */
export const createNewAdmin = async (req, res) => {
    try {
        const admin = await authService.createAdmin(req.body, req.user._id);
        res.status(201).json({
            success: true,
            message: 'New admin created successfully.',
            admin,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * getAdmins
 */
export const getAdmins = async (req, res) => {
    try {
        const admins = await authService.getAllAdmins(req.query);
        res.status(200).json({
            success: true,
            count: admins.length,
            admins,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * getAdmin
 */
export const getAdmin = async (req, res) => {
    try {
        const admin = await authService.getAdminById(req.params.id);
        res.status(200).json({ success: true, admin });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

/**
 * updateAdmin
 */
export const updateAdmin = async (req, res) => {
    try {
        const admin = await authService.updateAdmin(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Admin updated successfully.',
            admin,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * deleteAdmin
 */
export const deleteAdmin = async (req, res) => {
    try {
        await authService.deleteAdmin(req.params.id, req.user._id);
        res.status(200).json({
            success: true,
            message: 'Admin deleted successfully.',
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * toggleAdminStatus
 */
export const toggleAdminStatus = async (req, res) => {
    try {
        const admin = await authService.toggleAdminStatus(req.params.id, req.user._id);
        res.status(200).json({
            success: true,
            message: `Admin status changed to ${admin.status}.`,
            admin,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
