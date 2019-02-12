// Javascript for main post functionality
$(document).ready(function() {
  // Building jQuery refrences to all elements on our form requiring data input.
  var artistName = $("#artist-name");
  var songTitle = $("#song-title");
  var genre = $("#genre");
  var titleInput = $("#post-title");
  var reviewInput = $("#review-body");
  var authorName = $("#author-name");

  // Parts of the URL that come after the "?"
  var url = window.location.search;
  var reviewId;

  // A flag that states whether it's updated. Initial value is false.
  var updating = false;

  // // If there is an "update" after the url, we pull the review_id from the url.
  if (url.indexOf("?review_id=") !== -1) {
    reviewId = url.split("=")[1];
    getReviewData(reviewId);
  }

  // Event listener for when the #cms form is submitted.
  $("#addReview").on("click", handleFormSubmit);

  // Creating handleFormSubmit function when form is submitted that creates a new review
  function handleFormSubmit(event) {
    // Prevent automatic refresh
    event.preventDefault();

    // Wont submit the review if missing a body, title, or author
    if (
      !titleInput.val().trim() ||
      !reviewInput.val().trim() ||
      !authorName.val().trim()
    ) {
      return;
    }
    // // Construct newReview object to push to database
    var newReview = {
      title: titleInput.val().trim(),
      body: reviewInput.val().trim(),
      artist: artistName.val().trim(),
      song: songTitle.val().trim(),
      genre: genre.val().trim(),
      author: authorName.val().trim()
    };

    console.log(newReview);

    // // If updating a review, run updateReview
    // // Otherwise run submitReview to create new review
    if (updating) {
      newReview.id = reviewId;
      updateReview(newReview);
    } else {
      submitReview(newReview);
    }
  }

  // submitReview function that submits new review & brings user to blog page upon completion
  function submitReview(review) {
    $.post("/api/reviews", review, function() {
      window.location.href = "/blog";
    });
  }

  // Function that gets review data for the current post we're editing
  function getReviewData(id) {
    $.get("/api/reviews/" + id, function(data) {
      // If this review exists, prefill the form with data.
      if (data) {
        titleInput.val(data.title);
        reviewInput.val(data.body);
        artistName.val(data.artist);
        songTitle.val(data.song);
        genre.val(data.genre);
        // If a review with this id exists, set a flag that "updates" the review
        // when you hit submit
        updating = true;
      }
    });
  }

  // Update a given review, bring user to the blog page when done.
  function updateReview(review) {
    $.ajax({
      method: "PUT",
      url: "/api/reviews",
      data: review
    }).then(function() {
      window.location.href = "/blog";
    });
  }
});
