var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var client = require('twilio')('ACec120bce9d6649ee44e22fc3d43e9c68', '902572dba95f5e11aa9cd0946a57d7e6');
var http = require("http");

var routes = require('./routes/index');
//var addfile = require('./routes/addfile');

var app = express();
var the_port = process.env.PORT || 4000;
app.listen(the_port);

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/mobiledata';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose.connect('mongodb://127.0.0.1/mobiledata');

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var connection = mongoose.connection;
mongoose.model('list', {phone: String, pkey: String}, 'pkeys');
mongoose.model('kode', {phone: String, code: String}, 'codes');



app.get('/register', function (req, res) {

    doc = {phone: req.query.phone, pkey: req.query.pkey};
    console.log("+" + req.query.phone);
    var fn = "+" + req.query.phone;


    mongoose.model('kode').find({phone: fn}, function(err, results) {
        console.log(results);
        var codeshouldbe = results[0].code;

    });

    if (codeshouldbe == req.query.code)
    {
      connection.collection('pkeys').remove({phone: fn}, function (err) {

     });
      connection.collection('pkeys').insert(doc, function (err){

      });
     res.send({0: "Success"});

    }

    else {
        res.send({0: "Failure"});
    }

});

app.get("/getkey", function (req, res) {
    mongoose.model('list').find({phone: req.query.phone}, function(err, results){
        res.send(results[0].pkey);
    });
});


app.post('/incoming', function(req, res) {
  // Extract the From and Body values from the POST data
  console.log("inside incoming");
  var from = req.body.From;

  console.log(req.body.Body + " " + from);
  
  // Return sender a very nice message
  // twiML to be executed when SMS is received
  var newcode = Math.floor(Math.random() * 899999 + 100000);
  var twiml = '<Response><Sms>' + newcode + '</Sms></Response>';
   connection.collection('codes').insert({phone: from, code: newcode }, function (err) {});

  res.send(twiml, {'Content-Type':'text/xml'}, 200);
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//TWILIO

// Create a function to handle our incoming SMS requests (POST request)


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


