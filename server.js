'use strict';

// Modules
const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');

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

// Route declarations
// Serve React app as static asset in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use('/api', apiRouter);

// 404 error handler
    // todo Add appropriate handler
app.use((req, res) => {
    res.send('404');
});
  
// Global error handler
    // todo Set up appropriate handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.send(err.stack);
});
  
// Start port
const server = app.listen(app.get('port'), () => {
console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
