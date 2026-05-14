import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './features/auth/auth_routes.js';
import productRoutes from './features/products/product_routes.js';

const app = express();

// ─── Middlewares ──────────────────────────────────────────────────────────────

app.use(
    cors({

        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', productRoutes);

app.get('/', (_req, res) => {
    res.send('Ecommerce API is running...');
});

export default app;
