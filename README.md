# Bands Overload
![Bands overload Home Page Img](/public/img/readmeImage.png?raw=true)
[Bands Overload](https://bands-overload.herokuapp.com/) is a Spotify music review blog. The application uses Facebook User Authentication to require a user to be logged in before they can create a new review. Once logged in, the user can enter their favorite genre, artist, and song and select "search" to display data from the Spotify API including album artwork and a link to preview the song if one is available. The information the user entered is stored in a mySQL database, and a new genre category is created for their entry and displayed on the homepage. The user can then add a new post reviewing that song, which will also be displayed on the homepage in order of the most recently added.
## MVC & CRUD
This is a data-persistent, fullstack application that utilizes model/view/controller architecture, as well as CRUD:
 
|CRUD Functionalities   |CRUD In Bands Overload            
|-----------------------|-------------------------------
|Create  |Creates data when a user makes a new post
|Read  |Reads data when the new data is displayed
|Update |Updates when the user edits the new post
|Delete |Deletes when the user removes the post
## Technologies
- Materialize CSS
- Node.js
- mySQL
- Sequelize
- Spotify API
- Facebook User Authentication
## Future Development
Further development of this application could include more ways to login without using a Facebook account, a link to open the user's Spotify account in a new window, and using the Moment.js library to add timestamps to new posts.