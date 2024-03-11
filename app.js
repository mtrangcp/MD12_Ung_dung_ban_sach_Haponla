var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

const db = require("./configs/database");
const apiResponseMiddleware = require("./middlewares/response");
const errorMiddleware = require("./middlewares/error");
const apiCategoryRouter = require("./routes/categoryApi.route");
const apiBookRouter = require("./routes/bookApi.route");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");

var app = express();

// connect database
db.connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.use("/api", apiRouter);
app.use("/api/categories", apiCategoryRouter);
app.use("/api/books", apiBookRouter);

//# middlewares
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHanlder);

module.exports = app;
