//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const aboutContent = "Hello! This is a website I made for composing journals. Click on compose to compose a new post!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const articles = [];

app.get('/', function(req, res){
  res.render("home", {
  posts: articles
  });
});

app.get('/posts/:postName', function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  articles.forEach(function(post){
    const currentTitle = _.lowerCase(post.title);
    if (currentTitle === requestedTitle)
    {
      res.render("post", {title: currentTitle, post: post.post});
    }
  })
});

app.get('/about', function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get('/contact', function(req, res){
  res.render("contact");
});

app.get('/compose', function(req, res){
  res.render("compose")
});

app.post("/compose", function(req, res){
  var article = {
    title: req.body.title,
    post: req.body.post
  }

  articles.push(article);

  res.render("home", {
    posts: articles
    });
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
