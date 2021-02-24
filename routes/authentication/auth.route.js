const express = require('express');
const passport = require('passport');
const  { check, validationResult } = require('express-validator') ;
var { signup, login, logout } = require('./auth.controller');

const auth = express.Router();

auth.post('/signup',
    [
        check('firstName')
        .isLength({min: 3})
        .withMessage('Name must have mininum length of 3')
        .trim(),

        check('email')
        .isEmail()
        .withMessage('Invalid email address'),

        check('password')
        .isLength({ min: 8 })
        .withMessage('Password should have min and max length between 8-15')
        .matches(/\d/)
        .withMessage('Password should have at least one number')
    /*    .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password should have at least one special character'),*/
/*
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
*/
    ],
    (req, res, next) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        const hasError = !error.isEmpty();

        if (hasError) {
            res.status(422).json({ 
                error: error.array(),
                message: 'Invalid user info provided.'
            });
        } else {
            next();
        }
    },
    signup
);

auth.post('/login', login);

auth.get('/logout', logout);

module.exports = auth