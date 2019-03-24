'use strict';

// Modules
const express = require('express');
const request = require('request-promise-native');
const router = express.Router();
const { User } = require('../models/User');
require('dotenv').config()
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_KEY,
    Promise: Promise
});

// User Verification and Updating Middleware
const verifyAndUpdate = (req, res, next) => {
    if (req.session && req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            // Check for errors or no user
            if (err || !user) {
                const error = new Error ('Please sign in.');
                error.status = 401;
                return next(error);
            }
            // Variable Declarations
            let start = req.query.start.toLowerCase().replace(/,/g, '');
            let dest = req.query.dest.toLowerCase().replace(/,/g, '');
            let prevSearch = user.previousSearches;
            // Update the user's search array
            if (prevSearch.length = 3) {
                prevSearch.splice(0, 1);
                prevSearch.push([start, dest]);
            } else {
                prevSearch.push([start, dest]);
            }
            user.previousSearches = prevSearch;
            user.save((err, user) => {
                if (err) {
                    err.status = 500;
                    return next(err);
                }
                next();
            })
        })
    }
    const error = new Error('Please sign in or register.')
    error.status = 401;
    next(error);
};

// Route
// todo Set up appropriate error handlers
router.get('/v1/postcard', verifyAndUpdate, (req, res, next) => {
    googleMapsClient.geocode({address: req.query.dest})
        .asPromise()
        .then((response) => {
            if (response.json.status === "OK") {
                // Variables
                const destGeocode = response.json.results[0].geometry.location
                const weatherOptions = {
                    uri: `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${destGeocode.lat},${destGeocode.lng}?exclude=[currently,minutely,hourly,alerts,flags]`,
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
                                                icon,
                                                temperatureHigh: highTemp,
                                                temperatureLow: lowTemp
                                            } = dailyArray[i];
                                            dailyArray[i] = {
                                                summary,
                                                icon,
                                                highTemp,
                                                lowTemp
                                            };
                                            dailyData.push(dailyArray[i]);
                                        }
                                        return ({ 
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
                Promise.all([distanceData, weatherData, placeData, foodData, req.query.dest])
                    .then(results => {
                        res.json(results);
                    })
                    .catch(err => next(err));
            }
            
        })
        .catch(err => next(err));
});

module.exports = router;
