require('dotenv').config()
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const db = require("./configs/database");
const apiResponseMiddleware = require("./middlewares/response");
const errorMiddleware = require("./middlewares/error");

const apiVariationRouter = require("./routes/variationApi.route");
const apiEvaluteRouter = require("./routes/evaluateApi.route");
const categoryRouter = require('./routes/category.route');
const bookRouter = require('./routes/book.route');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var billsRouter = require("./routes/bill");

var app = express();

// connect database
db.connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/home");

//# middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(apiResponseMiddleware());
app.use(
  session({
    secret: "tranghtmlalalallala123aptx4869",
    resave: false,
    saveUninitialized: true,
    // ,cookie: { secure: true }
  })
);

//# routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bill", billsRouter);

app.use("/api", apiRouter);
app.use("/api/variations", apiVariationRouter);
app.use("/api/evaluates", apiEvaluteRouter);

app.use("/categories", categoryRouter);
app.use("/books", bookRouter);


//# middlewares
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHanlder);

module.exports = app;
