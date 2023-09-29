const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.set("view engine", "ejs");

//BodyParsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
  
//Routes
app.use("/", require("./routes/urls"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log("Server has started at port " + PORT));