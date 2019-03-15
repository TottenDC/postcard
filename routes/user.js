'use strict';

// Modules
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

// Routes
router.post('/register', (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
        const err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
    }
    let user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            err.status = 400;
            return next(err);
        }
        res.redirect('/home');
    });
});

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (err, user) => {
          if (err || !user) {
            const error = new Error('Wrong email or password.');
            error.status = 401;
            return next(error);
          } else {
            req.session.userId = user._id;
            return res.redirect('/home');
          }
        });
      } else {
        const err = new Error('Email and password are required.');
        err.status = 401;
        next(err);
      }
});

router.get('/logout', (req, res, next) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  });

module.exports = router;
