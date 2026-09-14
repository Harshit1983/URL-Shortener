const express = require('express');

const cors = require('cors');

const urlRoutes = require('./routes/urls');

const authRoutes = require('./routes/auth');

const indexRoutes = require('./routes/index');

const linksRouter = require('./routes/links');

const errorHandler = require('./middleware/errorMiddleware');

const cookieParser = require('cookie-parser');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://urlshort-hraj.vercel.app',
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use('/api', urlRoutes);

app.use('/api/auth', authRoutes);

app.use('/', indexRoutes);

app.use('/api/links', linksRouter);

app.use(errorHandler);

module.exports = app;