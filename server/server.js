// Npm packages
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Connect to localhost MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecookbookdb");

// Sessions
app.use(session({
   secret: "pikachu",
   store: new MongoStore({ mongooseConnection: dbConnection }),
   resave: false,
   saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());