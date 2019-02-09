$(document).ready(function() {
  // referencing all jQuery objects
  var reviewContainer = $(".review-container");
  var reviewGenreSelect = $(".genre-container");

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
    // Create new card object & heading
    var newReviewCard = $("<div>");
    newReviewCard.addClass("card");
    var newReviewCardHeading = $("<div>");
    newReviewCardHeading.addClass("card-header");
    // Create new objects for edit and delete buttons
    var deleteButton = $("<button>");
    deleteButton.text("DELETE");
    deleteButton.addClass("delete-review btn btn-danger");
    var editButton = $("<button>");
    editButton.text("EDIT");
    editButton.addClass("edit-button btn btn-default");
    editButton.attr("data-id", review.id);
    // Create new objects for review title, author, genre, song title, and artist name
    var newReviewTitle = $("<h2>");
    var newReviewArtistAndSongTitle = $("<h4>");
    var newReviewGenre = $("<h5>");
    var newReviewAuthor = $("<small>");
    // Attributing text & css to genre
    newReviewGenre.text(review.genre);
    newReviewGenre.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    // Attributing text to artist/song
    newReviewArtistAndSongTitle.text(
      "Review for: " + review.song + " | " + "by " + review.artist
    );
    // Create new object for the card-body (where the REVIEW will go)
    var newReviewCardBody = $("<div>");
    newReviewCardBody.addClass("card-body");
    var newReviewBody = $("<p>");
    // Adding text values to review title, author, song title, and artist name
    newReviewTitle.text(review.title + " ");
    // Adding the "review" itself into a usable object
    newReviewBody.text(review.body);
    newReviewAuthor.text("Written by: " + review.author);
    // Appending all data to display on the card-heading
    newReviewCardHeading.append(newReviewTitle);
    newReviewCardHeading.append(newReviewArtistAndSongTitle);
    newReviewCardHeading.append(newReviewGenre);
    // Appending the "review" into the card-body
    newReviewCardBody.append(newReviewBody);
    // Appending the "buttons" after the review body
    newReviewCardBody.append(editButton);
    newReviewCardBody.append(deleteButton);
    // Appending author to the card-body
    newReviewBody.append(newReviewAuthor);
    newReviewCard.append(newReviewCardHeading);
    newReviewCard.append(newReviewCardBody);
    newReviewCard.data("review", review);
    // return newReviewCard;
    $(".review-container").append(newReviewCard);
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
