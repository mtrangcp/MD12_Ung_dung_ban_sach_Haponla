var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { handleError, handleNotFound } = require('./middlewares/errorHandler')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const CategoryRouter = require('./routes/category.route')
const VariationRouter = require('./routes/variation.route')
const BookRouter = require('./routes/book.route')
const EvaluateRouter = require('./routes/evaluate.route')
const BillRouter = require('./routes/bill.route')
const BillItemRouter = require('./routes/billItem.route')
const CartRouter = require('./routes/cart.route')

var app = express();

// #config
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// #routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/api/categories', CategoryRouter)
app.use('/api/variations', VariationRouter)
app.use('/api/evaluates', EvaluateRouter)
app.use('/api/books', BookRouter)
app.use('/api/bills', BillRouter)
app.use('/api/billItems', BillItemRouter)
app.use('/api/carts', CartRouter)

// #middlewares
app.use(handleNotFound);
app.use(handleError);

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

});

module.exports = app;

