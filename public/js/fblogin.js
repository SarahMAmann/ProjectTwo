/* eslint-disable no-unused-vars */
// to access the FB SDK, script tag has to go at the beginning of the body according to the documentation
window.fbAsyncInit = function() {
  FB.init({
    // our app id
    appId: "2361577430742579",
    cookie: true,
    xfbml: true,
    // the current version
    version: "v3.2"
  });
  //   to access login statuses
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};
// the sdk
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// this function checks to see if a user is logged in or not
function statusChangeCallback(response) {
  if (response.status === "connected") {
    //  if logged in do the following
    console.log("logged in and authenticated");
    $("#blog").show();
    $("#logout-btn").show();
    $("#login-btn").hide();
    $(".login-hide").show();
  } else {
    // if logged out do the following
    console.log("not authenticated");
    $("#blog").hide();
    $("#logout-btn").hide();
    $(".login-hide").hide();
    // $("login-btn").show();
  }
}
// checks the login status
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// logout function
function logout() {
  FB.logout(function() {
    // what to do if the user is logged out
    $("#blog").hide();
    $("login-btn").show();
    $("#logout-btn").hide();
    $(".login-hide").hide();
    // refreshes the window
    window.location.reload();
  });
}
