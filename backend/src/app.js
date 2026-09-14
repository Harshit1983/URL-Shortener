const express = require('express');

const cors = require('cors');

const urlRoutes = require('./routes/urls');

const authRoutes = require('./routes/auth');

const indexRoutes = require('./routes/index');

const linksRouter = require('./routes/links');

const errorHandler = require('./middleware/errorMiddleware');

const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://urlshort-hraj.vercel.app'
    ]
}));

app.use(express.json());

app.use(cookieParser());

app.use('/api', urlRoutes);

app.use('/api/auth', authRoutes);

app.use('/', indexRoutes);

app.use('/api/links', linksRouter);

app.use(errorHandler);

module.exports = app;