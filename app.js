var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

/*app.get('/addfile/:filename', function(req, res) {
  //res.render('respond with a resource');
    N = 256;
    s = new Array(N+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, N);

    doc = {name: req.params.filename, password: s, token: req.query.token, author: req.query.author};
    connection.collection('passwords').insert(doc, function (err){

    });

    res.render("addfile", {name: req.params.filename})
});
*/

app.get('/register', function (req, res) {

    doc = {phone: req.query.phone, pkey: req.query.pkey};
    connection.collection('pkeys').remove({phone: req.query.phone}, function (err) {

    });
    connection.collection('pkeys').insert(doc, function (err){

    });
});

app.get("/getkey", function (req, res) {
    mongoose.model('list').find({phone: req.query.phone}, function(err, results){
        res.send(results[0].pkey);
    });
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
