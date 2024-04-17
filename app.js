require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

const database = require("./configs/database");

const apiResponseMiddleware = require("./middlewares/response");
const errorMiddleware = require("./middlewares/error");

const addressApi = require('./apis/address.api')
const categoryApi = require("./apis/category.api");
const bookApi = require("./apis/book.api");
const cartApi = require("./apis/cart.api");

const categoryRouter = require("./routes/category");
const bookRouter = require("./routes/book");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var billsRouter = require("./routes/bill");

var app = express();

// connect database
database.connectDb();

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
// apis
app.use("/api/addresses", addressApi);
app.use("/api/categories", categoryApi);
app.use("/api/books", bookApi);
app.use("/api/carts", cartApi);
app.use("/api", apiRouter);
// web
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bill", billsRouter);
app.use("/categories", categoryRouter);
app.use("/books", bookRouter);

//# middlewares
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHanlder);

module.exports = app;
