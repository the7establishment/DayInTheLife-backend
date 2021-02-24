const User = require('../user/user.model');
const uniqid = require('uniqid');
var mongoose = require('mongoose');

const login = (req, res) => {
    return res.status(200).json({ userId: req.user.userId });
};

const signup = (req, res) => {
    var email = req.body.email;
    User.findOne({ email })
        .then(result => {
            if(!result) {
                let newUser = new User({ 
                    _id : new mongoose.Types.ObjectId,
                    userId : uniqid(),
                    ...req.body
                });
                newUser.save()
                .then(user => {
                    console.log(`User created successfully with the following id ${user._id}`)
                    res.status(200).json({
                    message: `User created successfully!`,
                    userId: user.userId
                    })
                })
                .catch(err => {
                    res.status(500).json({
                    error: err
                    })
                })
            } else {
                res.status(422)
                .json({ errors: ['User with this email already exists'] });
            }
        })
};

const logout = (req, res) => {
    req.logout();
    res.status(200).json({ msg: 'Logged out' });
};

module.exports = {
    login,
    signup,
    logout
}