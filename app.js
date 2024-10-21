const express = require("express");
var createError = require("http-errors");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db.connect");
const userModel = require("./models/user");
const indexRouter = require("./routes/index");
const expressSession = require("express-session");
const PORT = process.env.PORT;
const passport = require("passport");
const app = express();
dotenv.config();

app.use(logger("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", indexRouter);

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
app.listen(PORT, () => {
  console.log(`http://127.0.0.4:${PORT}`);
});

connectDB();
