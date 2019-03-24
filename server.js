'use strict';

// Modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookiesMiddleware = require('universal-cookie-express');
const apiRouter = require('./routes/api');
const userRouter = require('./routes/user');

// Variables
const app = express();

// Port setup
app.set('port', process.env.PORT || 3001);

// DB setup
mongoose.connect('mongodb://localhost:27017/postcard', { useNewUrlParser: true });
const db = mongoose.connection;

// DB error handling and initialization
db.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once('open', () => {
  console.log('Database connected.')
});

// Session setup
app.use(session({
    secret: 'yay first app',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}));

// Express middleware
app.use(express.json());

// Cookie middleware
app.use(cookiesMiddleware());

// Route declarations
// Serve React app as static asset in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(userRouter);
app.use('/api', apiRouter);
app.get('/home', (req, res, next) => {
    if (!req.session || !req.session.userId) {
        const err = new Error('Please log in or register');
        err.status = 401;
        next(err);
    }
});

// 404 error handler
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
  
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.redirect(`/error?message=${err.message}`);
});
  
// Start port
const server = app.listen(app.get('port'), () => {
console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
