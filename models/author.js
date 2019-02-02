// This JS file creates the basic structure of the Author table and associates it with the Review table.
// Once structure is built, export the Author object to be used in other files.

module.exports = function (sequelize, DataTypes) {

    // Defining the structure of AUTHOR table.
    // Unique ID, createdAt and updatedAt are automatic.
    var Author = sequelize.define("Author", {

        // NAME column is required, needs to be unique, and needs to be at least 3 chars long.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: 3,
                    msg: "Name must be at least 3 characters in length"
                }
            }
        },

        // PASSWORD column is required, and needs to be at least 6 chars long.
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 6
                }
            }
        }
    });

    // Associate this AUTHOR table with REVIEW table.
    // When an Author is deleted, delete their associated Reviews as well.
    Author.associate = function (models) {
        Author.hasMany(models.Review, {
            onDelete: "cascade"
        });
    };

    // Completed AUTHOR object returned.
    return Author;

};