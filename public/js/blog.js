// Main js for blog display/update/delete functions
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

  // POST-A-REVIEW value input fields
  var reviewTitle = $("#review-title");
  var genreInput = $("#genre");
  var artistInput = $("#artist");
  var songTitle = $("#song");
  var reviewAuthor = $("#author");
  var reviewBody = $("#review-body");
  var imgUrlInput = $("#image-url");

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
        imgUrlInput.val(data.tracks.items[i].album.images[i].url);
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
      body: reviewBody.val().trim(),
      albumimage: imgUrlInput.val().trim()
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
      imgUrlInput.val("");
    });
  });

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

  // Click events for edit and delete buttons
  $(document).on("click", "button.delete-review ", handleReviewDelete);
  $(document).on("click", "button.edit-button", handleReviewEdit);

  // Creating reviews object
  var reviews;

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
    // alert(reviews.length);
    for (var i = 0; i < reviews.length; i++) {
      createNewRow(reviews[i]);
    }
  }

  // Function that constructs the review HTML!
  function createNewRow(review) {
    //   alert("This works");
    // // Create new card object DIV
    // // !!!! The main object being displayed !!!!!
    var newReviewRow = $("<div>");
    newReviewRow.addClass("col s12 m4");
    // // create the newReviewCard DIV
    var newReviewCard = $("<div>");
    newReviewCard.addClass("card");
    // // Create its main blog image DIV
    var newReviewCardImgCard = $("<div>");
    newReviewCardImgCard.addClass("card-image");
    // Attributing img file into object
    var newReviewCardPhoto = $("<img>");
    newReviewCardPhoto.attr("src", review.albumimage);
    // // Create its heading SPAN & assigning its value
    var newReviewCardHeading = $("<span>");
    newReviewCardHeading.addClass("card-title");
    newReviewCardHeading.text(review.title);
    // Create the photo & heading part of the CARD
    newReviewCardImgCard.append(newReviewCardPhoto);
    newReviewCardImgCard.append(newReviewCardHeading);
    // Creating edit and delete buttons
    var editButton = $("<button>");
    editButton.text("EDIT");
    editButton.addClass("edit-button btn btn-default");
    var deleteButton = $("<button>");
    deleteButton.text("x");
    deleteButton.addClass("delete-review btn btn-danger");
    // // Create the main review body DIV
    var newReviewCardBody = $("<div>");
    newReviewCardBody.addClass("card-content");
    // // Create the objects for review song/artist/genre/author
    var newReviewArtistAndSongTitle = $("<h5>");
    var newReviewGenreAndAuthor = $("<small>");
    newReviewGenreAndAuthor.html(
      "in " + review.genre + " | written by: " + review.author
    );
    newReviewArtistAndSongTitle.html(
      "Review for: " + review.song + " <br>by " + review.artist
    );
    // // Create the review body object to pass into DIV
    var newReviewBody = $("<p>");
    newReviewBody.text(review.body);
    // // Append everything needed for newReviewCardBody card-content
    newReviewCardBody.append(newReviewArtistAndSongTitle);
    newReviewCardBody.append(newReviewBody);
    newReviewCardBody.append(newReviewGenreAndAuthor);
    newReviewCardBody.append(deleteButton);
    newReviewCardBody.append(editButton);
    // // Append everything needed for the entire newReviewCard DIV to display.
    newReviewCard.append(newReviewCardImgCard);
    newReviewCard.append(newReviewCardBody);
    newReviewCard.data("review", review);
    newReviewRow.append(newReviewCard);
    // //   // Return newReviewRow into the reviewContainer DIV;
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
