$(document).ready(function() {
  // Building jQuery refrences to all elements on our form requiring data input.
  var artistName = $("#artist-name");
  var songTitle = $("#song-title");
  var genre = $("#genre");
  var titleInput = $("#post-title");
  var reviewInput = $("#review-body");

  // Building jQuery references to all other elements.
  var cmsForm = $("#cms");
  var spotifySearchForm = $("#spotify-search");
  var authorSelect = $("#author-select");

  // Event listener for when the #cms form is submitted.
  $("#addReview").on("click", handleFormSubmit);

  // Parts of the URL that come after the "?"
  var url = window.location.search;
  var reviewId;
  var authorId;

  // A flag that states whether it's updated. Initial value is false.
  var updating = false;

  // // If there is an "update" after the ur, we pull the review_id from the url.
  // if (url.indexOf("?review_id=") !== -1) {
  //   reviewId = url.split("=")[1];
  //   getReviewData(reviewId, "review");
  // }
  // // Otherwise if it's an author_id, preset the author select box to be Author.
  // else if (url.indexOf("?author_id=") !== -1) {
  //   authorId = url.split("=")[1];
  // }

  // Get all Authors, and their reviews
  //getAuthors();

  // Creating handleFormSubmit function when form is submitted that creates a new post
  function handleFormSubmit(event) {
    // Prevent automatic refresh
    event.preventDefault();

    // If there's any missing body/title/author fields, prevent submit
    // if (
    //   !titleInput.val().trim() ||
    //   !reviewInput.val().trim() ||
    //   !authorSelect.val()
    // ) {
    //   return;
    // }

    // // Construct newReview object to push to database
    var newReview = {
      title: titleInput.val().trim(),
      body: reviewInput.val().trim(),
      artist: artistName.val().trim(),
      song: songTitle.val().trim(),
      genre: genre.val().trim(),
      AuthorId: authorSelect.val()
    };

    alert(newReview.title);

    submitReview(newReview);
    // // If updating a review, run updateReview
    // // Otherwise run submitReview to create new review
    // if (updating) {
    //     newReview.id = reviewId;
    //     updateReview(newReview);
    // }
    // else {
    //     submitReview(newReview);
    //     console.log(newReview);
    // }
  }

  // submitReview function that submits new review & brings user to blog page upon completion
  function submitReview(review) {
    $.post("/api/reviews", review, function() {
      window.location.href = "/blog";
    });
  }

  // Function that gets review data for the current post we're editing, or if we're adding
  // to an author's existing posts
  // function getReviewData(id, type) {
  //   var queryURL;
  //   switch (type) {
  //   case "review":
  //     queryURL = "/api/reviews/" + id;
  //       break;
  //     case "author":
  //     queryURL = "/api/authors/" + id;
  //     break;
  //     default:
  //     break;
  //   }
  //   $.get(queryURL, function(data) {
  //     if (data) {
  //       console.log(data.AuthorId || data.id);
  //       // Prefill cms form with data (if post exists)
  //       titleInput.val(data.title);
  //       bodyInput.val(data.body);
  //       artistName.val(data.artist);
  //       songTitle.val(data.song);
  //       genre.val(data.genre);
  //       authorId = data.AuthorId || data.id;
  //       // Change the "updating" to true
  //       updating = true;
  //     }
  //   });

  //   return  queryURL ;
  // }

  // getAuthors function that gets and renders the list of Authors
  // function getAuthors() {
  //   $.get("/api/authors", renderAuthorList);
  // }
  // renderAuthorList that either list existing authors, or redirects you to the
  // page where you can create a new author first
  // function renderAuthorList(data) {
  //   if (!data.length) {
  //     window.location.href = "/authors";
  //   }
  //   $(".hidden").removeClass("hidden");
  //   var rowsToAdd = [];
  //   for (var i = 0; i < data.length; i++) {
  //     rowsToAdd.push(createAuthorRow(data[i]));
  //   }
  //   authorSelect.empty();
  //   console.log(rowsToAdd);
  //   console.log(authorSelect);
  //   authorSelect.append(rowsToAdd);
  //   authorSelect.val(authorId);
  // }

  // Creates author options inside the dropdown
  // function createAuthorRow(author) {
  //   var listOption = $("<option>");
  //   listOption.attr("value", author.id);
  //   listOption.text(author.name);
  //   return listOption;
  // }

  // Update a given review, bring the user to the blog page once done
  // function updateReview(review) {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/reviews",
  //     data: review
  //   }).then(function() {
  //     window.location.href = "/blog";
  //   });
  // }
});
