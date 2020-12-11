const express = require("express");
const router = express.Router();
const Post = require("../modules/Posts");

router.get("/", (req, res) => {
  res.send("WE ARE IN About");
});

router.get("/specific", (req, res) => {
  res.send("WE ARE a SPECIFIC About");
});

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  post.save()
    .then(data => {
        res.json(data);
    })
     .catch(err =>{
res.json({message: err});
    }) ;
});

module.exports = router;
