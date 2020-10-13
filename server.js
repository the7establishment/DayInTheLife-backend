var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = process.env.PORT || 4201;
// var mongoClient = require('mongodb').MongoClient
var connectionString = ''
var mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:" + process.env.Mongo_Admin_PW + "@dayinthelife-dev.ozz3z.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//routes
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

//connect to the Database
// mongoose.connect(connectionString)

server.listen(port, function(){
  console.log('Server is running my server on PORT: ' + port)
})

//test endpoint to see if server is up
server.get('/ping', function(request, response){
  console.log('PING')
  response.send({ping: 'ping'})
})
server.use(function (req, res, next) {

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

module.export = server