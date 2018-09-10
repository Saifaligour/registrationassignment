var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// bodyParser use to access the post request data
var bodyParser = require('body-parser');
//  pasport use  to login autontication
var pasport = require('passport');
var session = require('express-session');

// connectin with mongodb using mongoose
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/user1data', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoDb connnectes successfully')
});

// route process
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors=require('cors');


var app = express();
app.use(cors({
  origin:["http://localhost:4200","http://127.0.0.1:4200"],
  credentials:true,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing process
app.use('/', indexRouter);
app.use('/users', usersRouter);

// use pasport and express session
app.use(session({
  name:'Myname.id',
  resave:false,
  secret:'secret',
  saveUninitialized:false,
  cookie:{
    maxAge:360000000,
    httpOnly:false,
    secure:false
  }
}));

require('./pasport-config');
app.use(pasport.initialize());
app.use(pasport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
