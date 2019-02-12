// This JS file creates the basic structure of the Review table and associates it with the Author table.
// Once structure is built, export the Review object to be used in other files.

module.exports = function(sequelize, DataTypes) {
  // Defining the structure of REVIEW table.
  // Unique ID, createdAt and updatedAt are automatic.
  var Review = sequelize.define("Review", {
    // TITLE is required - ensures all review formats are uniform.
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    // BODY is required - obviously we want a review to read!
    body: {
      type: DataTypes.TEXT,
      alowNull: false,
      len: [1]
    },

    // ARTIST is required
    artist: {
      type: DataTypes.STRING,
      alowNull: false,
      len: [1]
    },

    // SONG is required
    song: {
      type: DataTypes.STRING,
      alowNull: false,
      len: [1]
    },

    // GENRE is required
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },

    albumimage: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  // Completed REVIEW object returned.
  return Review;
};
