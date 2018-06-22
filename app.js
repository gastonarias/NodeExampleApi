
var restify = require('restify');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var config = require('./config/dbConnection.js');
var restifyValidator = require('restify-validator');
const mongoose = require('mongoose');

mongoose.connect(config.getMontoConecction());
setupController(server, restify, restifyValidator);
userController(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
