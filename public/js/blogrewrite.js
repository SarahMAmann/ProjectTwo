$(document).ready(function() {
  // Referencing all our jQuery objects
  var reviewContainer = $("#review-container");

  // Buttons
  var spotifySearchButton = $("#searchbtn");
  var reviewSubmitButton = $("#reviewbtn");

  // SPOTIFY value input fields
  var spotifyArtist = $("#band-name");
  var spotifySongTitle = $("#song-title");
  var spotifyResults = $("#spotifyresults");

  // Future SPOTIFY global variables that just need to be declared for now.
  var spotifyPreviewURL;
  var spotifyAlbumName;
  var spotifyAlbumImage;

  // POST-A-REVIEW value input fields
  var reviewTitle = $("#review-title");
  var genreInput = $("#genre");
  var artistInput = $("#artist");
  var songTitle = $("#song");
  var reviewAuthor = $("#author");
  var reviewBody = $("#review-body");

  //==============================================================================

  // BEGIN SPOTIFY Search once spotifySearchButton is pressed.
  spotifySearchButton.on("click", function(event) {
    // Prevent automatic refresh
    event.preventDefault();

    // Capture all user input for Spotify to search with
    var bandNameSearch = spotifyArtist.val().trim();
    var songSearch = spotifySongTitle.val().trim();

    // Begin Spotify API call to retrieve JSON.
    $.ajax({
      method: "GET",
      url: "/api/spotify/" + bandNameSearch + "/" + songSearch
    }).then(function(data) {
      spotifyResults.empty();
      for (var i = 0; i < data.tracks.items.length; i++) {
        // Populates artist and song title in the review form inputs,
        // so you don't have to retype it again.
        artistInput.val(data.tracks.items[i].artists[i].name);
        songTitle.val(data.tracks.items[i].name);

        // Save these values into the previously declared global variables
        // to be used in later functions.
        spotifyPreviewURL = data.tracks.items[i].preview_url;
        spotifyAlbumName = data.tracks.items[i].album.name;
        spotifyAlbumImage = data.tracks.items[i].album.images[i].url;
      }
      console.log(data.tracks);
    });
  });

  // When user is finished typing their review, this button gets clicked.
  // This sends all pertinent information to the database.
  reviewSubmitButton.on("click", function() {
    // Creates a newReview object.
    var newReview = {
      title: reviewTitle.val().trim(),
      genre: genreInput.val().trim(),
      artist: artistInput.val().trim(),
      song: songTitle.val().trim(),
      author: reviewAuthor.val().trim(),
      body: reviewBody.val().trim()
    };

    // Post newReview into database.
    $.post("/api/reviews", newReview, function(data) {
      // Send user back to the same page.
      window.location.href = "/";

      // Empty out input fields.
      reviewTitle.val("");
      genreInput.val("");
      artistInput.val("");
      songTitle.val("");
      reviewAuthor.val("");
      reviewBody.val("");
    });

    // Click events for edit and delete buttons
    $(document).on("click", "button.delete-review ", handleReviewDelete);
    $(document).on("click", "button.edit-button", handleReviewEdit);

    // Creating reviews object
    var reviews;

    // This function grabs reviews from the database and updates the review
    function getReviews(genre) {
      var genreString = genre || "";
      if (genreString) {
        genreString = "/genre/" + genreString;
      }
      $.get("/api/reviews" + genreString, function(data) {
        console.log("Reviews", data);
        reviews = data;
        initializeRows();
      });
    }

    // This function calls API to delete reviews
    function deleteReview(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/reviews/" + id
      }).then(function() {
        getReviews();
      });
    }

    // Function that appends all of constructed review HTML inside reviewContainer
    function initializeRows() {
      reviewContainer.empty();
      for (var i = 0; i < reviews.length; i++) {
        createNewRow(reviews[i]);
      }
    }

    // Function that constructs the review HTML!
    function createNewRow(review) {
      // Create new card object DIV
      // !!!! The main object being displayed !!!!!
      var newReviewRow = $("<div>");
      newReviewRow.addClass("col s12 m4");

      // create the newReviewCard DIV
      var newReviewCard = $("<div>");
      newReviewCard.addClass("card");
      newReviewCard.html("<p>This works</p>");
    //   // Create its main blog image DIV
    //   var newReviewCardImg = $("<div>");
    //   newReviewCardImg.addClass("card-image");
    //   newReviewCardImg.html("<img src='" + spotifyAlbumImage + "'");
    //   // Create its heading SPAN & assigning its value
    //   var newReviewCardHeading = $("<span>");
    //   newReviewCardHeading.addClass("card-title");
    //   newReviewCardHeading.text(review.title + " ");
    //   // Create the main review body DIV
    //   var newReviewCardBody = $("<div>");
    //   newReviewCardBody.addClass("card-content");
    //   // Create the objects for review song/artist/genre/author
    //   var newReviewArtistAndSongTitle = $("<h4>");
    //   var newReviewGenre = "<h5>";
    //   var newReviewAuthor = $("<small>");
    //   newReviewArtistAndSongTitle.text(
    //     "Review for: " + review.song + " | " + "by " + review.artist
    //   );
    //   newReviewGenre.text(review.genre);
    //   newReviewAuthor.text("Written by: " + review.author);
    //   // Create the review body object to pass into DIV
    //   var newReviewBody = $("<p>");
    //   newReviewBody.text(review.body);
    //   // Append everything needed for newReviewCardBody card-content
    //   newReviewCardBody.append(newReviewArtistAndSongTitle);
    //   newReviewCardBody.append(newReviewArtistAndSongTitle);
    //   newReviewCardBody.append(newReviewBody);
    //   newReviewCardBody.append(newReviewAuthor);
    //   // Append everything needed for the entire newReviewCard DIV to display.
    //   newReviewCard.append(newReviewCardImg);
    //   newReviewCard.append(newReviewCardHeading);
    //   newReviewCard.append(newReviewCardBody);
    //   newReviewCard.data("review", review);
      newReviewRow.append(newReviewCard);
    //   // Return newReviewRow into the reviewContainer DIV;
      reviewContainer.prepend(newReviewRow);
    }

    // Function that finds out which review to delete and calls deleteReview
    function handleReviewDelete() {
      var currentReview = $(this)
        .parent()
        .parent()
        .data("review");
      deleteReview(currentReview.id);
    }

    function handleReviewEdit() {
      var currentReview = $(this)
        .parent()
        .parent()
        .data("review");
      window.location.href = "/cms?review_id=" + currentReview.id;
    }

    // Getting the initial list of reviews
    getReviews();
  });
});
