import Joi from 'joi';

// ─── Signin ───────────────────────────────────────────────────────────────────
export const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase()
        .trim()
        .required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.',
        }),

    password: Joi.string().min(8).required().messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters.',
        'any.required': 'Password is required.',
    }),
});

// ─── Admin Management ─────────────────────────────────────────────────────────

export const createAdminSchema = Joi.object({
    name: Joi.string().min(2).max(60).trim().required(),
    email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim().required(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    password: Joi.string().min(8).max(128).required(),
    role: Joi.string().valid('user', 'admin', 'super_admin').default('admin'),
    status: Joi.string().valid('active', 'inactive').default('active'),
});

export const updateAdminSchema = Joi.object({
    name: Joi.string().min(2).max(60).trim(),
    email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/),
    role: Joi.string().valid('user', 'admin', 'super_admin'),
    status: Joi.string().valid('active', 'inactive'),
    avatar: Joi.string().uri(),
});
