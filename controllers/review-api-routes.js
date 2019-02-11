// This file contains routing for displaying/saving Reviews to db.

var db = require("../models");

// Dependencies for the keys required for spotify
var keys = require("./keys");
 
// Create Spotify/spotify objects
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// ======================================================================================

// ======================================================================================

// Routes to be exported
module.exports = function(app) {
  app.get("/api/spotify/:bandname/:song", function(req, res) {

    console.log("song:"+req.params.song+" "+"band:"+ req.params.bandname);
    spotify.search({ type: "track", query: req.params.song }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log(" ");
      console.log(
        "----------------------------------------------------------------"
      );
      console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
      console.log("Song Title: " + data.tracks.items[0].name);
      console.log("Preview Link Here: " + data.tracks.items[0].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Image: " + data.tracks.items[0].album.images[0].url);
      console.log(
        "----------------------------------------------------------------"
      );
      console.log(data);
      res.json(data);
    });
  });

  // GET route for all existing Reviews
  app.get("/api/reviews", function(req, res) {
    db.Review.findAll({}).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // GET route for returning posts based on genre
  app.get("/api/reviews/genre/:genre", function(req, res) {
    db.Review.findAll({
      where: {
        genre: req.params.genre
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // GET route for retrieving a single post
  app.get("/api/reviews/:id", function(req, res) {
    db.Review.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // POST route for creating and saving a new Review
  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {

      console.log(req.body);
      res.json(dbReview);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/reviews/:id", function(req, res) {
    db.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // PUT route for updating posts
  app.put("/api/reviews", function(req, res) {
    db.Review.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};
