const express = require('express');
const cookieParser = require('cookie-parser');

const urlRoutes = require('./routes/urls');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const linksRouter = require('./routes/links');

const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', urlRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/links', linksRouter);

app.use('/', indexRoutes);

// Error middleware must be last
app.use(errorHandler);

module.exports = app;