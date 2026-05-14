import jwt from 'jsonwebtoken';
import Admin from './admin_model.js';

/**
 * validate(schema)
 * Express middleware factory — Joi schema se request body validate karta hai.
 * Validation fail hone par 422 ke saath readable error messages return karta hai.
 */
export const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,   // saare errors ek saath dikhao, pehle wale par rukna nahi
        stripUnknown: true,  // allowed fields ke alawa sab kuch hata do
    });

    if (error) {
        const messages = error.details.map((d) => d.message);
        return res.status(422).json({
            success: false,
            message: 'Validation failed.',
            errors: messages,
        });
    }

    // Validated + sanitized value ko body par replace karo
    req.body = value;
    next();
};

/**
 * protect
 * Middleware to verify JWT token from cookies.
 */
export const protect = async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.adminToken) {
        token = req.cookies.adminToken;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, please login.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Admin.findById(decoded.id);
        
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }

        if (req.user.status === 'inactive') {
            return res.status(403).json({ success: false, message: 'Account is deactivated.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized, token failed.' });
    }
};

/**
 * restrictTo(...roles)
 * Middleware to authorize specific roles.
 */
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route.`,
            });
        }
        next();
    };
};

