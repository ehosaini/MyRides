const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


/* -------------------------------------- Routers ----------------------------------------- */
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
// const usersRouter = require('./routes/users');
const userHistoryRouter = require('./routes/userHistory');
const userRidesRouter = require('./routes/userRides');


/* -------------------------------------- App Setup ----------------------------------------- */
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false

}));


/* -------------------------------------- Routes ----------------------------------------- */
app.use('/', indexRouter);

//router for handling Uber's OAuth2 flow 
app.use('/api', loginRouter);

// app.use('/users', usersRouter);

app.use('/user-history', userHistoryRouter);

app.use('/my-rides', userRidesRouter);

app.use('/logout', logoutRouter);


/* -------------------------------------- Error Handling ----------------------------------------- */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;