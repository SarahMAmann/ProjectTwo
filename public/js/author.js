$(document).ready(function() {
  // jQuery references to our objects
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");

  // Event listeners for creating new object and deleting an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonClick);

  // Fetch the list of Authors
  getAuthors();

  // When form is submitted to create a new author.
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // If name hasn't been filled out, do nothing
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    // Call upsertAuthor function and pass in value of name input
    upsertAuthor({
      name: nameInput.val().trim()
    });
  }

  // Create a new author function - calls getAuthors once complete.
  function upsertAuthor(authorData) {
    $.post("/api/authors", authorData).then(getAuthors);
  }

  // Function that creates a new list-row for Authors
  // function createAuthorRow(authorData) {}
});
