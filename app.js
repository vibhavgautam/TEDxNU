DB_USER = ENV['DB_USER'];
DB_PASS = ENV['DB_PASS'];

console.log(DB_USER);

// Mongoose database stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds061148.mongolab.com:61148/tedxdb');
//mongoose.connect('mongodb://localhost/tedxdb');
var Schema = mongoose.Schema;

// Mongoose data models

var submissionmodel = mongoose.model('submissionmodel', {
  name: String,
  submission_id: Number,
  email: String,
  status: String,
  title: String,
  video_link: String,
  description: String,
  rightperson: String,
  finalist: Number,
  selected: Number,
  votes: { type: Number, default: 0 },
  submitted: { type: Date, default: Date.now }
})


/**
 * Module dependencies.
 */

var express = require('express');

var app = express();
app.use(express.bodyParser()); // Allows parsing of ajax requests


var routes = require('./routes')(app, mongoose, submissionmodel);
var user = require('./routes/user');
var http = require('http');
var path = require('path');




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.png')); // new favicon
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
