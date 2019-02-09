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
    })
    .then(function() {
      getReviews();
    })
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
    var newReviewCard = $("<div>");
    newReviewCard.addClass("card");
    var newReviewCardHeading = $("<div>");
    newReviewCardHeading.addClass("card-header");
    var deleteButton = $("<button>");
    deleteButton.text("x");
    deleteButton.addClass("delete-review btn btn-danger");
    var editButton = $("<button>");
    editButton.text("EDIT");
    editButton.addClass("edit-button btn btn-default");
    editButton.attr("data-id", review.id);
    var newReviewTitle = $("<h2>");
    var newReviewGenre = $("<h5>");
    var newReviewAuthor = $("<small>");
    newReviewGenre.text(review.genre);
    newReviewGenre.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px"
    });
    var newReviewCardBody = $("<div>");
    newReviewCardBody.addClass("card-body");
    var newReviewBody = $("<p>");
    newReviewTitle.text(review.title + " ");
    newReviewBody.text(review.body);
    newReviewAuthor.text(review.author);
    newReviewCardHeading.append(deleteButton);
    newReviewCardHeading.append(editButton);
    newReviewCardHeading.append(newReviewTitle);
    newReviewCardHeading.append(newReviewGenre);
    newReviewCardBody.append(newReviewBody);
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

  // Function displays message when there are NO reviews
  // function displayEmpty() {
  //   reviewContainer.empty();
  //   var messageH2 = $("<h2>");
  //   messageH2.css({ "text-align": "center", "margin-top": "50px" });
  //   messageH2.html(
  //     "There are no reviews yet! Click <a href='/cms'>here</a> to create a new review!"
  //   );
  // }

  // Getting the initial list of reviews
  getReviews();
});
