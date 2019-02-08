// This file contains all the routing for AUTHORS

var db = require("../models");

// Routes to be exported
module.exports = function(app) {
  // GET route for selecting ALL authors in database.
  // We added an "include" property to do a left outer join with db.Post
  app.get("/api/authors", function(req, res) {
    db.Author.findAll({
      include: [db.Review]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // GET route for selecting an author by id
  // Just like above, db.Post is included
  // Fetch unique id with req.params.id so you don't accidentally delete
  // anything else!
  app.get("/api/authors/:id", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // POST route that allows creation of new Author
  // The data will be pulled from req.body
  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  // DELETE route that allows us to remove an Author from db.
  // Fetch unique id with req.params.id so you don't accidentally delete
  // anything else!
  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });
};
