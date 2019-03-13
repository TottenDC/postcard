'use strict';

// Modules
const express = require('express');
const router = express.Router();
const auth = require('basic-auth');
const { User } = require('../models/User');
require('dotenv').config()

// Authentication Middleware
// const authenticateUser = (req, res, next) => {
//     const credentials = auth(req);
//     if (credentials) {
//         User.authenticate(credentials.name, credentials.pass, (err, user) => {
//             if (err || !user) {
//                 const error = new Error('Wrong email or password.');
//                 error.status = 401;
//                 return next(error);
//             }
//             req.currentUser = user;
//             return next();
//         }); 
//     } else {
//         const err = new Error('Provide credentials.');
//         err.status = 400;
//         return next(err);
//     }
// };

// Routes
// todo Add back the authenicateUser middleware
router.get('/postcard', (req, res, next) => {
    
});

module.exports = router;
