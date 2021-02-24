var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('./routes/user/user.model');

module.exports =function() {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy(
        { usernameField: "email" },
        function(username, password, done) {
            User.findOne({ email : username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false,
                        { message: 'Invalid username or password.' });
                }
                user.checkPassword(password, user.password, function(err, isMatch) {
                    if (err) { return done(err); }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false,
                            { message: 'Invalid username or password.' })
                    }
                })
            })
        }
    ))
}