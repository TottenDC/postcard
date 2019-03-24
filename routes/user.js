'use strict';

// Modules
const express = require('express');
const router = express.Router();
const Cookies = require('universal-cookie');
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
        const cookies = new Cookies(req.headers.cookie);
        if (err) {
            err.status = 400;
            return next(err);
        }
        req.session.userId = user._id;
        cookies.set('icon', user.icon, { path: '/' });
        cookies.set('searches', user.previousSearches, { path: '/' });
        res.sendStatus(200);
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
            const cookies = new Cookies(req.headers.cookie);
            req.session.userId = user._id;
            cookies.set('icon', user.icon, { path: '/' });
            cookies.set('searches', user.previousSearches, { path: '/' });
            res.sendStatus(200);
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
        res.sendStatus(200);
      });
    }
  });

module.exports = router;
