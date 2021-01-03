const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const Post = require("./modules/Posts");
const Product = require("./modules/Products");
require("dotenv").config();

const app = express();
app.use(cors());
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to DB!");
});

//Middleware functions run when u hit a route

/* app.use("/posts", () => {
  console.log("this is a Middleware running");
}); */

app.use(bodyParser.json());

// Import Routes
// const postsRoute = require("./routes/posts");

// app.use("/about", postsRoute);

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

app.post("/posts", async (request, response) => {
  const blogPost = new Post({
    title: request.body.title,
    description: request.body.description,
  });

  try {
    const savedPost = await blogPost.save();
    response.json(savedPost);
  } catch (err) {
    response.json({ message: err });
  }
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).exec();
  res.json(post);
});

app.get("/postsList", async (req, res) => {
  const post = await Post.find({}).exec();
  res.json(post);
});

// Single Product creation

app.post("/products", async (request, response) => {
  const product = new Product({
    name: request.body.name,
    image: request.body.image,
    price: request.body.price,
  });

  try {
    const savedProduct = await product.save();
    response.json(savedProduct);
  } catch (err) {
    response.json({ message: err });
  }
});

//List of Products

app.get("/productList", async (req, res) => {
  const productList = await Product.find({}).exec();
  res.json(productList);
});

// GET single Product
app.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ _id: productId });
  if (!product){
    res.status(404).end();
  }else{
    res.json(product);
  }
});

//Connect to DB

//Listen to the Server

app.listen(3000);
