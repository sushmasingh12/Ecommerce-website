import express from 'express';
import {
    signin,
    signout,
    getMe,
    getAdmins,
    getAdmin,
    createNewAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus,
} from './auth_controller.js';
import { protect, restrictTo, validate } from './auth_middleware.js';
import {
    signinSchema,
    createAdminSchema,
    updateAdminSchema,
} from './auth_validation.js';

const router = express.Router();

// ─── Public Routes ───────────────────────────────────────────────────────────
router.post('/signin', validate(signinSchema), signin);
router.post('/signout', signout);

// ─── Protected Routes (Logged in admins only) ─────────────────────────────────
router.use(protect);
router.get('/me', getMe);

// ─── Super Admin Only Routes (Admin Management) ──────────────────────────────
router.use(restrictTo('super_admin'));

router.route('/manage-admins')
    .get(getAdmins)
    .post(validate(createAdminSchema), createNewAdmin);

router.route('/manage-admins/:id')
    .get(getAdmin)
    .patch(validate(updateAdminSchema), updateAdmin)
    .delete(deleteAdmin);

router.patch('/manage-admins/:id/toggle-status', toggleAdminStatus);

export default router;
