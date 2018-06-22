var helpers = require('../config/helperFunctions.js');

var users = {};
var max_user_id= 0;

module.exports = function(server){

    server.get("/", function(req, res, next){
          helpers.success(res, next, users);
    });

    server.get("/user/:id", function(req, res, next){
          req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
          var errors = req.validationErrors();
          if(errors){
            helpers.failure(res, next, errors[0], 400);
            return next();
          }
          if (typeof(users[req.params.id])==='undefined'){
            helpers.failure(res, next, 'The especific user could not be found in the database', 404);
            return next();
          }
          helpers.success(res, next, users[parseInt(req.params.id)])
    });

    server.post("/user", function(req, res, next){
          req.assert('first_name', 'First Name is required').notEmpty();
          req.assert('last_name', 'Last Name is required').notEmpty();
          req.assert('email_user', 'Email is required and must be a valid email').notEmpty().isEmail();
          req.assert('career', 'Career must be student, teacher or professor').isIn(['student', 'teacher', 'professor']);
          var errors = req.validationErrors();
          if(errors){
            helpers.failure(res, next, errors, 400);
            return next();
          }
          var user = req.params;
          max_user_id++;
          user.id = max_user_id;
          users[user.id] = user;
          helpers.success(res, next, user);
    });

    server.put("/user/:id", function(req, res, next){
          if (typeof(users[req.params.id])==='undefined'){
            helpers.failure(res, next, 'The especific user could not be found in the database', 404);
            return next();
          }
          var user = users[parseInt(req.params.id)];
          var updates = req.params;

          for(var field in updates){
            user[field] = updates[field];
          }
          helpers.success(res, next, users);
    });

    server.del("/user/:id", function(req, res, next){
          if (typeof(users[req.params.id])==='undefined'){
            helpers.failure(res, next, 'The especific user could not be found in the database', 404);
            return next();
          }
          delete users[parseInt(req.params.id)];
          helpers.success(res, next, []);
    });
}
