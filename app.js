const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
require("dotenv/config");


//Middleware functions run when u hit a route

app.use("/posts", () => {
  console.log("this is a Middleware running");
});

app.use(bodyParser.json());

// Import Routes
const postsRoute = require("./routes/posts");

app.use("/about", postsRoute);

//ROUTES

app.get("/", (req, res) => {
  res.send("WE ARE ON HOME");
});

/* app.get("/posts", (req, res) => {
  res.send("WE ARE IN POSTS");
}); */

app.get("/about", (req, res) => {
    res.send("WE ARE IN ABOUT");
  });

//Connect to DB

mongoose.connect(
    process.env.DB_CONNECTION,
{ useNewUrlParser: true },
()=>{
    console.log("connected to DB!");
});

//Listen to the Server

app.listen(3000);
