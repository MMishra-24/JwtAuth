const express = require("express");
const app = express();
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");


// postgres DB conncetion
const prisma = require('./config/db');
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

//BodyParsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
  

app.use(passport.initialize());
app.use(passport.session());
loginCheck(passport);
//Routes
app.use("/", require("./routes/urls"));

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started at port " + PORT));