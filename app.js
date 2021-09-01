var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
require('dotenv').config()

// mongoose 연결
const mongoose = require('mongoose')
const dburl = process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD);
mongoose.set('useFindAndModify', false);
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// app 설정
var app = express();

// cache 제거
const nocache = require("nocache");
app.use(nocache());

// cors 설정
const cors = require('cors');
app.use(cors());

// 바디파서 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// indexPage data 이후는 vuejs에서 build한 파일 사용함
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 스케쥴러
const scheduler = require('./js/scheduler')

// api 라우터 목록
app.use('/api/user', require('./routes/user'));
app.use('/api/mailAuth', require('./routes/mailAuth'));
app.use('/api/dailyWrite', require('./routes/dailyWrite'));
app.use('/api/code', require('./routes/code'));
app.use('/api/subject', require('./routes/subject'));
app.use('/api/dailySubject', require('./routes/dailySubject'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
