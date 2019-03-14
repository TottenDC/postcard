'use strict';

// Modules
const express = require('express');
const request = require('request-promise-native');
const router = express.Router();
const auth = require('basic-auth');
const { User } = require('../models/User');
require('dotenv').config()
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_KEY,
    Promise: Promise
});

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
router.get('/v1/postcard', (req, res, next) => {
    /*
    1. Do the geocode.
    2. In the "then" block:
        3. Set reponse to a variable.
        4. Create fetch variables using await for the 3 APIs
        5. Add all that shit into an object literal
        6. Send it as res.json()
    7. Error handle like a pro
    */
    googleMapsClient.geocode({address: req.query.dest})
        .asPromise()
        .then((response) => {
            if (response.json.status === "OK") {
                const destGeocode = response.json.results[0].geometry.location
                const weatherOptions = {
                    uri: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${destGeocode.lat},${destGeocode.lng}?exclude=[minutely,hourly,alerts,flags]`,
                    json: true
                };
                const placesOptions = {
                    uri: `https://en.wikipedia.org/w/api.php`,
                    qs: {
                        action: 'query',
                        generator: 'geosearch',
                        prop: 'pageimages|description',
                        ggscoord: `${destGeocode.lat}|${destGeocode.lng}`,
                        format: 'json'
                    },
                    json: true
                };
                const foodOptions = {
                    uri: `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${req.query.dest}&limit=5&sort_by=rating`,
                    qs: {
                        term: 'restaurant',
                        location: req.query.dest,
                        limit: 5,
                        sort_by: 'rating'
                    },
                    headers: {
                        'Authorization': `Bearer ${process.env.YELP_KEY}`
                    },
                    json: true
                }

                request(weatherOptions)
                    .then(weather => {
                        const weatherData = {...weather};
                        request(placesOptions)
                            .then(places => {
                                const placeData = {...weatherData, ...places};
                                request(foodOptions)
                                    .then(food => {
                                        const foodData = {...weatherData, ...placeData, ...food};
                                        res.json(foodData);
                                    })
                                    .catch(err => next(err));
                            })
                            .catch(err => next(err));
                    })
                    .catch(err => next(err));
                
            }
            
        })
        .catch(err => next(err));
});

module.exports = router;
