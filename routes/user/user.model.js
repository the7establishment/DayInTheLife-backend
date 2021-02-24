var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var SALT_FACTOR = 10;

var noop = function() {};


var userSchema = mongoose.Schema({
  lookupId: { 
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  fullName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  country: String,
  region: String,
  homeCountry: String,
  homeRegion: String
})

userSchema.pre('save', function(done) {
  var user = this;
  if(!user.isModified('password')) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if(err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, 
      function(err, hashedPassword) {
        if (err) { return done(err); }
        user.password = hashedPassword;
        done();
      })
  })
});

userSchema.methods.checkPassword = function(guess, actual, done) {
  bcrypt.compare(guess, actual, function(err, isMatch) {
    done(err, isMatch);
  })
}
var User = mongoose.model('User', userSchema);
module.exports = User;