const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const setUpPassport = require('./setup_passport');
const dayRoutes = require('./routes/day/day.route');
const userRoutes = require('./routes/user/user.route');
const productRoutes = require('./routes/product/product.route');
const jobRoutes = require('./routes/job/job.route');
const authRoutes = require('./routes/authentication/auth.route');

const app = express();
const uri = "mongodb+srv://admin:" + process.env.Mongo_Admin_PW + "@dayinthelife-dev.ozz3z.mongodb.net/testdb?retryWrites=true&w=majority";
const port = process.env.PORT || 4201;
//connect to the Database
try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
  console.log(e);
}
setUpPassport();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//test endpoint to see if server is up
app.get('/ping', function (request, response) {
  console.log('PING');
  response.send({ ping: 'ping' });
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/day', dayRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/job', jobRoutes);
app.use('/auth',authRoutes);

app.listen(port, function () {
  console.log('Server is running my server on PORT: ' + port);
});



module.export = app;