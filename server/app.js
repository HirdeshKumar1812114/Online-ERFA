var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var erfaRouter = require("./routes/erfaRoutes/userErfa");
var studentRouter = require("./routes/studentRoutes/userStudent");
var panelistRouter = require("./routes/panelistRoutes/userPanelist");
var erfaOfficerRouter = require("./routes/erfaRoutes/erfaOfficerDetails");
var scholarshipPostRouter = require("./routes/erfaRoutes/scholarshipPost");

var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 1000000,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/erfa", erfaRouter);
app.use("/users", usersRouter);
app.use("/student", studentRouter);
app.use("/panelist", panelistRouter);
app.use("/officer", erfaOfficerRouter);
app.use("/scholarship", scholarshipPostRouter);
app.use("/getPoster", express.static("public/uploadScholarshipPoster/"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
