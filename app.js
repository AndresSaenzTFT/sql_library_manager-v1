// Setup whole express app

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");

var routes = require("./routes/index");
var books = require("./routes/books");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
//when declaring a route with the model, it combines the declared route with the default "/" route
app.use("/books", books);

//express runs the www bin file

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "Sorry! We couldn't find the page you were looking for.";
  res.status(error.status).render("page-not-found", { error });
});

// error handler
app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  if (!err.message) {
    err.message = "Sorry! There was an unexpected error on the server.";
  }

  console.error(err.status, err.message);
  res.status(err.status).render("error", { err });
});

module.exports = app;
