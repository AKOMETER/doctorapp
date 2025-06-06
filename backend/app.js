var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const syncDatabase = require("./database/syncDatabase");
require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const reminderJob = require("./jobs/reminderJob.js");
var app = express();

//cron job
reminderJob.start();

//for prod
app.use(helmet());
app.use(compression());

// Allow all origins
app.use(cors());
app.use(logger("dev"));

// Bodyparser Middleware
app.use(express.json());

// Passport Middleware
require("./config/passport")(passport);
app.use(passport.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors({ origin: "http://localhost:3001" }));

// Synchronize the database when the app starts
syncDatabase();

// all routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));
app.use("/specialty", require("./routes/specialty"));
app.use("/doctor", require("./routes/doctor"));
app.use("/lab", require("./routes/lab"));
app.use("/product", require("./routes/product"));
app.use("/appointment", require("./routes/appointment"));
app.use("/payment-method", require("./routes/payment_method"));
app.use("/transaction", require("./routes/transaction"));
app.use("/cart", require("./routes/cart"));
app.use("/order", require("./routes/order"));
app.use("/product", require("./routes/product"));
app.use("/record", require("./routes/record"));
app.use("/medical_record", require("./routes/medical_record"));
app.use("/message", require("./routes/message.js"));

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
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status,
  });
});

module.exports = app;
