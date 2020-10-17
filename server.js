var express = require('express')
var server = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 4201;

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

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