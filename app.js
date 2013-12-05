
// Mongoose database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tedxdb');
var Schema = mongoose.Schema;

// Mongoose data models




/**
 * Module dependencies.
 */



var express = require('express');

var app = express();
app.use(express.bodyParser()); // Allows parsing of ajax requests


var routes = require('./routes')(app, mongoose);
var user = require('./routes/user');
var http = require('http');
var path = require('path');




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
