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

// Route
// todo Add back the authenicateUser middleware
// todo Set up appropriate error handlers
router.get('/v1/postcard', (req, res, next) => {
    googleMapsClient.geocode({address: req.query.dest})
        .asPromise()
        .then((response) => {
            if (response.json.status === "OK") {
                // Variables
                const destGeocode = response.json.results[0].geometry.location
                const weatherOptions = {
                    uri: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${destGeocode.lat},${destGeocode.lng}?exclude=[minutely,hourly,alerts,flags]`,
                    json: true
                };
                const placeOptions = {
                    uri: `https://api.yelp.com/v3/businesses/search`,
                    qs: {
                        term: 'places of interest',
                        location: req.query.dest,
                        limit: 5,
                    },
                    headers: {
                        'Authorization': `Bearer ${process.env.YELP_KEY}`
                    },
                    json: true
                };
                const foodOptions = {
                    uri: `https://api.yelp.com/v3/businesses/search`,
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
                };

                // 3rd Party API Calls
                const distanceData = googleMapsClient.distanceMatrix({
                                        origins: [req.query.start],
                                        destinations: [req.query.dest],
                                        units: 'imperial'
                                    })
                                    .asPromise()
                                    .then(distance => {
                                        const {
                                            json: {
                                                rows: [
                                                    {
                                                        elements: [
                                                            {
                                                                duration: {
                                                                    text: tripDuration
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            json: {
                                                rows: [
                                                    {
                                                        elements: [
                                                            {
                                                                distance: {
                                                                    text: tripDistance
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        } = distance;
                                        return ({tripDuration, tripDistance});    
                                    }); // end distanceData
                const weatherData = request(weatherOptions)
                                    .then(weather => {
                                        const {
                                            currently: {
                                                summary: currentSummary
                                            },
                                            currently: {
                                                temparature: currentTemp
                                            },
                                            daily: {
                                                summary: dailySummary
                                            },
                                            daily: {
                                                data: dailyArray
                                            }
                                        } = weather;
                                        let dailyData = [];
                                        for (let i = 0; i < 3; i++) {
                                            let {
                                                summary,
                                                temperatureHigh: highTemp,
                                                temperatureLow: lowTemp
                                            } = dailyArray[i];
                                            dailyArray[i] = {
                                                summary,
                                                highTemp,
                                                lowTemp
                                            };
                                            dailyData.push(dailyArray[i]);
                                        }
                                        return ({
                                            currentSummary, 
                                            currentTemp, 
                                            dailySummary,
                                            dailyData
                                        });
                                    });
                const placeData = request(placeOptions)
                                    .then(places => {
                                        const {
                                            businesses: placesArray
                                        } = places;
                                        let placeData = [];
                                        placesArray.forEach((place) => {
                                            let {
                                                name: title,
                                                image_url: img,
                                                url: link,
                                                location: {
                                                    display_address: address
                                                }
                                            } = place;
                                            place = {
                                                title,
                                                img,
                                                link,
                                                address
                                            };
                                            placeData.push(place);
                                        });
                                        return ({placeData});
                                    });
                const foodData = request(foodOptions)
                                    .then(food => {
                                        const {
                                            businesses: restaurantArray
                                        } = food;
                                        let foodData = [];
                                        restaurantArray.forEach((restaurant) => {
                                            let {
                                                name: title,
                                                image_url: img,
                                                url: link,
                                                location: {
                                                    display_address: address
                                                }
                                            } = restaurant;
                                            restaurant = {
                                                title,
                                                img,
                                                link,
                                                address
                                            };
                                            foodData.push(restaurant);
                                        });
                                        return ({foodData});
                                    });
                Promise.all([distanceData, weatherData, placeData, foodData])
                    .then(results => {
                        res.json(results);
                    })
                    .catch(err => next(err));
            }
            
        })
        .catch(err => next(err));
});

module.exports = router;
