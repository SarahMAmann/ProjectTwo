$(document).ready(function () {

    $("#searchbtn").on("click", function (event) {
        event.preventDefault();




        var bandname = $("#band-name").val().trim();
        var song = $("#song-title").val().trim();



        $.ajax({
            method: "GET",
            url: "/api/spotify/" + bandname + "/" + song
        }).then(function (data) {
            $("#spotifyresults").empty();
            for(var i=0;i < data.tracks.items.length;i++)
            {
                $("#spotifyresults").append(" ");
                $("#spotifyresults").append(
                    "----------------------------------------------------------------"
                );
                $("#spotifyresults").append("<p>Artist Name: " + data.tracks.items[i].artists[i].name+"</p>");
                $("#spotifyresults").append("<p>Song Title: " + data.tracks.items[i].name+"</p>");
                $("#spotifyresults").append("<p>Preview Link Here: " + data.tracks.items[i].preview_url+"</p>");
                $("#spotifyresults").append("<p>Album: " + data.tracks.items[i].album.name+"</p>");
                $("#spotifyresults").append("<p>Image: " + data.tracks.items[i].album.images[i].url+"</p>");
                $("#spotifyresults").append(
                    "----------------------------------------------------------------"
                );
            }
            
            console.log(data.tracks);

            // window.location.href = "/blog";
        });
        //    alert(spotifyData.bandname +" " +spotifyData.song);

    });


});