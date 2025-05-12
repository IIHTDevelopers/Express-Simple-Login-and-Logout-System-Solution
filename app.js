var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const hotelRoutes = require('./routes/hotelRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// need to add routes here
app.use('/api', hotelRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middleware (after routes)
app.use(errorHandler);

module.exports = app;
