var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
var User = require("./userModel.js");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/tessel", { useNewUrlParser: true });

// Routes

app.post("/submit", function(req, res) {
  

  var user = new User(req.body);
  user.coolifier();
  user.makeCool();

  User.create(user)
    .then(function(dbUser) {
      
      res.json(dbUser);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});