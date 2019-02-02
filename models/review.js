// This JS file creates the basic structure of the Review table and associates it with the Author table.
// Once structure is built, export the Review object to be used in other files.

module.exports = function (sequelize, DataTypes) {

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
        }
    });

    // Associate this REVIEW table with AUTHOR table.
    // This ensures that a Review belongs to an Author.
    // Cannot proceed without Author due to foreign key constraint.
    Review.belongsTo(models.Author, {
        foreignKey: {
            allowNull: false
        }
    });

    // Completed REVIEW object returned.
    return Review;
};