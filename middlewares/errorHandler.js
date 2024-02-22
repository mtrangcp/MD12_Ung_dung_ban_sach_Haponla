const createError = require('http-errors');

// catch 404 and forward to error handler
exports.handleNotFound = (req, res, next) => {
    next(createError(404));
}

// error handler
exports.handleError = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  
    if (req.originalUrl.indexOf('/api') == 0) {
      res.json(
        {
          status: 0,
          msg: err.message
        }
      );
    } else {
      res.render('error');
    }
}
