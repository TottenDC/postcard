'use strict';

// Modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//Email validation
function validator (value) {
    if (/\w@\w+(\.com)$/.test(value)) {
        return true;
    } else {
        return false;
    }
}

const emailValidation = [validator, 'Please enter a valid email.']

// Schemas
const UserSchema = new Schema({
    emailAddress: {
        type: String, 
        required: [true,  'User email is required.'],
        unique: true,
        lowercase: true,
        validate: emailValidation
    },
    password: {
        type: String,
        trim: true, 
        required: [true, 'Password is required.']
    },
    icon: {
        type: String
    },
    previousSearches: {
        type: [String],
        lowercase: true
    }
});

// Hash passwords
UserSchema.pre('save', function(next) { 
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

// Authenticate User
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ emailAddress: email })
        .exec((err, user) => {
            if (err) {
                return callback(err);
            } else if (!user) {
                const error = new Error('User not found.');
                error.status = 401;
                return callback(error);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};

// Create models
const User = mongoose.model('User', UserSchema);

module.exports.User = User;
