var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery =require('jquery');

var routes = require('./routes/index');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
//app.engine('.html', require('ejs').__express);  后缀改成html
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes.bind(app);

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


//转发请求
var http = require("http");

app.find = function(req,host,url,success){
  var headers = req.headers;
  var options = {
    host: host,
    path: url,
    method: 'GET',
    headers: headers
  };


  var str = "";
  var req = http.request(options,function(res){
    res.on('data',function(data){
       str += data;
    });

    res.on('end',function(){   //数据传回完毕才能回调
      str = JSON.parse(str);
      success(res,str);
    });
  });


  req.on('error',function(e){
    console.log('problem with request: ' + e.message);
  });

   req.end();
};


//异常捕获，不会导致进程崩溃
process.on('uncaughtException', function (err) {
  console.log(err);
});

module.exports = app;