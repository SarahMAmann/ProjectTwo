// This file contains routes for sending users to the correct HTML pages

var path = require("path");

// Export routes for all HTML files
module.exports = function(app) {
  // Index route (index.html)
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // Blog routes to the index (index.html)
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // CMS  (content management system / post) route
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // Author-Management (add/delete authors) route
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  // About Page for the creators (us!) route
  app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });

   // About Page for the creators (us!) route
   app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
};
